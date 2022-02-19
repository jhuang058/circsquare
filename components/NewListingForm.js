import { useRef } from "react";

import Card from "./ui/Card";
import classes from "./NewListingForm.module.css";

function NewListingForm(props) {
  const titleInputRef = useRef();
  const longitudeInputRef = useRef();
  const lattitudeInputRef = useRef();
  // const propertyTypeInputRef = useRef();
  // const mainImageInputRef = useRef();
  // const imagesInputRef = useRef();
  // const pricePerNightInputRef = useRef();
  // const bedsInputRef = useRef();
  // const bedroomsInputRef = useRef();
  // const idInputRef = useRef();
  const descriptionInputRef = useRef();
  // const hostInputRef = useRef(); //pass in logged in user as a host
  // const reviewsInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredLongitude = longitudeInputRef.current.value;
    const enteredLattitude = lattitudeInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const listingData = {
      title: enteredTitle,
      location: [enteredLongitude,enteredLattitude],
      description: enteredDescription,
    };

    props.onAddListing(listingData);
  }

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">Listing Title</label>
          <input type="text" required id="title" ref={titleInputRef}/>
        </div>
        <div>
          <p>Location: </p>
          <label htmlFor="longitude">Longitude</label>
          <input type="number" required id="longitude" ref={longitudeInputRef}/>
          <label htmlFor="lattitude">Lattitude</label>
          <input type="number" required id="lattitude" ref={lattitudeInputRef}/>
        </div>
        <div>
          <p>Property Type: </p>
          <label htmlFor="apartment">Apartment</label>
          <input type="radio" required id="apartment" />
          <label htmlFor="house">House</label>
          <input type="radio" required id="house" />
          <label htmlFor="secondaryUnit">Secondary Unit</label>
          <input type="radio" required id="secondaryUnit" />
        </div>
        <div>
          <label htmlFor="mainImage">Main Image URL</label>
          <input type="url" required id="mainImage" />
        </div>
        <div>
          <label htmlFor="pricePerNight">Price Per Night</label>
          <input type="number" required id="pricePerNight" />
        </div>
        <div>
          <label htmlFor="beds">Number of Beds</label>
          <input type="number" required id="beds" />
        </div>
        <div>
          <label htmlFor="bedrooms">Bedrooms</label>
          <input type="number" required id="bedrooms" />
        </div>
        <div>
          <label htmlFor="id">Give the listing an ID</label>
          <input type="number" required id="id" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" required rows="5" ref={descriptionInputRef}></textarea>
        </div>

        <div>
          <button>Submit New Listing</button>
        </div>
      </form>
    </Card>
  );
}

export default NewListingForm;
