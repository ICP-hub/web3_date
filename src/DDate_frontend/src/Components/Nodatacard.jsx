import React from "react";
// import nodatacard from "../../assets/Images/CreateAccount/modatacard.jpg"

export default function NodataCard() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center relative">
            {/* <img
                alt="No data available"
                src={nodatacard}
                className="h-full w-full lg:max-w-lg"
                style={{ height: "106vh" }}
            /> */}
            <h1 className="text-4xl">No Data Found</h1>
            <div
                className="bg-black rounded-b-xl w-full lg:max-w-lg h-[30%] absolute bottom-0"
                style={{
                    background:
                        // "linear-gradient(to top, rgb(0, 0, 0) 50%, rgba(255, 255, 255, 0) 100%)",
                        "linear-gradient(0deg, rgba(115, 134, 133, 0.5) 50%, rgba(255, 255, 255, 0) 100%)"
                }}
            ></div>
        </div>
    );
}
