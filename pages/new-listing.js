import { sanityClient } from "../sanity";
import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewListingForm from "../components/NewListingForm";
import Card from "../components/ui/Card";

function NewListingPage() {
     const router = useRouter();

    async function addListingHandler(enteredData) {
      const doc = JSON.stringify(enteredData);

        sanityClient.create(doc).then((res) => {
          console.log(`Listing titled ${res.title} was created`)
        })
    router.push("/");
    }

  return (
    <Fragment>
      <Head>
        <title>Add a New Listing</title>
      </Head>
      <NewListingForm onAddListing={addListingHandler} />
    </Fragment>
  );
}

export default NewListingPage;

