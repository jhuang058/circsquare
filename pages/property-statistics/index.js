import React from "react";
import IncomeTable from "../../components/tables/IncomeTable";
import { sanityClient } from "../../sanity";
import ExpensesTable from "../../components/tables/ExpensesTable"

const index = ({ roomUnits, property }) => {

  return (
    <>
      <div className="statistics-container">
        <IncomeTable roomUnits={roomUnits} />
        <br />
        <ExpensesTable expenses={property[0].expenses}/>
      </div>
    </>
  );
};

export default index;

export const getServerSideProps = async () => {
  const query = `*[ _type == "unit" && address == "Darby St"]{
      unitTitle,
      tenant->{
          name,
          rentalPaymentHistory[]{
          payDate,
          amountPaid
          }
      }
    }`;

  const roomUnits = await sanityClient.fetch(query);

  const queryForExpenses = `*[_type == "property" && title == "Darby St"]{
      expenses[]{
          ...,
      }
  }`;

  const property = await sanityClient.fetch(queryForExpenses); //this fetches an array of property of size 1

return {
    props: {
        roomUnits,
        property 
    },
};
  
};
