import React, { useEffect, useState } from "react";

const AdminScreen = () => {
  return (
    <div className="bg-dark">
      <div className="container bg-light vh-100">
        <div className="row  py-5">
          <div className="col text-center ">
            <h1>
              <span>
                <i className="fa fa-cogs" aria-hidden="true"></i>{" "}
              </span>
              Panel administrador
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
