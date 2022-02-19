import { sanityClient } from "../sanity";
import { urlFor } from "../sanity";
import Link from "next/link";
import { isMultiple } from "../utils";
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { Avatar } from "@mui/material";
import ClickAwayListener from "../components/ClickAwayListener"

const Home = ({ roomUnits }) => {

  return (
    <>
      {roomUnits && (
        <div className="main">
          <div className="feed-container">
            <div className="feed">
              {roomUnits.map((roomUnit, index) => (
                // <Link href={`roomUnit/${roomUnit.slug.current}`} key={roomUnit._id}>
                  <div className="card">
                    <img src={urlFor(roomUnit.mainImage)}/>
                    <h3>{roomUnit.title}</h3>
                    <Avatar src={urlFor(roomUnit.tenant.image)}/>
                    <ClickAwayListener name={roomUnit.tenant.name} phoneNumber={roomUnit.tenant.phoneNumber} memo={roomUnit.tenant.memo}/>
                    <p><b>Start Date: </b>{roomUnit.startDate} <br/> <b>End Date: </b> {roomUnit.endDate !== null ? roomUnit.endDate:(roomUnit.endDateMemo !== null ? roomUnit.endDateMemo:"indefinite")}</p>
                  </div>
              ))}
            </div>
          </div>
          <div className="map">
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  const query = `*[ _type == "unit"]{
    unitTitle,
    mainImage,
    tenant->{
        _id,
        name,
        slug,
        image,
        memo,
        phoneNumber
    },
    startDate,
    endDate,
    endDateMemo
}`;
  const roomUnits = await sanityClient.fetch(query);

  if (!roomUnits.length) {
    return {
      props: {
        roomUnits: [],
      },
    };
  } else {
    return {
      props: {
        roomUnits
      },
    };
  }
};

export default Home;
