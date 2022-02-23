import { sanityClient } from "../sanity";
import { urlFor } from "../sanity";
import { Avatar } from "@mui/material";
import ClickAwayListener from "../components/ClickAwayListener";
import RentTable from "../components/tables/RentTable";


const Home = ({ roomUnits }) => {
  //const [user, loading, error] = useAuthState(firebase.auth());

  //console.log("Loading:", loading, "|", "Current user:", user);

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     height: "100vh",
    //     width: "100vw",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     flexDirection: "column",
    //     gridGap: 8,
    //     background:
    //       "linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
    //   }}
    // >
      // {loading && <h4>Loading...</h4>}
      // {!user && <Auth />}
      // {user && (
        <>
          {roomUnits && (
            <div className="main">
              <div className="feed-container">
                <div className="feed">
                  {roomUnits.map((roomUnit, index) => (
                    // <Link href={`roomUnit/${roomUnit.slug.current}`} key={roomUnit._id}>
                    <div className="card" key={index}>
                      <img src={urlFor(roomUnit.mainImage)} />
                      <Avatar src={urlFor(roomUnit.tenant.image)} />
                      <ClickAwayListener
                        name={roomUnit.tenant.name}
                        phoneNumber={roomUnit.tenant.phoneNumber}
                        memo={roomUnit.tenant.memo}
                      />
                      <p>
                        <b>Start Date: </b>
                        {roomUnit.startDate} <br /> <b>End Date: </b>{" "}
                        {roomUnit.endDate ??
                          roomUnit.endDateMemo ??
                          "indefinite"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rent-table">
                <RentTable roomUnits={roomUnits} />
              </div>
            </div>
          )}
        </>
    //   )}
    // </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[ _type == "unit"]{
    unitTitle,
    mainImage,
    rate,
    tenant->{
        _id,
        name,
        slug,
        image,
        memo,
        phoneNumber,
        rentalPaymentHistory[]{
          ...,
        }
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
        roomUnits,
      },
    };
  }
};

export default Home;
