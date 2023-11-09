import React, { useEffect, useMemo, useState } from 'react'
import { Select, SelectItem } from "@nextui-org/react";

const UseTable = () => {

    let options = [

        { label: "City 1", value: "city1" },
        { label: "City 2", value: "city2" },
        { label: "City 3", value: "city3" },
    ]

    const [SelectedCity, SetSelectedCity] = React.useState(new Set([options[1]['value']]));
    // SETTING DEFAULT CITY AS 1ST CITY

    const [Variable, SetVariable] = useState("-")
    // A  Variable THAT WILL CHANGE according to the SelectedCity



    const handleSelectionChange = (e:any) => {
        SetSelectedCity(new Set([e.target.value]));
        console.log("Selected City", Array.from(SelectedCity));

        // YOU MAY NOTICE THAT SELECTION IS OLD, LAGGING BEHIND LATEST STATE
        // TO FIX THAT USE, useMemo 
        // Using Array.from() to make a array out of Set Data type
    };




    // WHENEVER SelectedCity CHANGES useMemo will be fired
    useMemo(() => {
        console.log("City Selection Changed : ", Array.from(SelectedCity));
        // Using Array.from() to make a array out of Set Data type
        console.log("Changing the variable :", Array.from(SelectedCity)[0].toUpperCase());
        SetVariable(Array.from(SelectedCity)[0].toUpperCase())
    }, [SelectedCity])


    return (
        <div>
            <h3>This Variable changes according to SelectedCity : {Variable}</h3>
            <Select
                items={options}
                selectedKeys={SelectedCity}
                // onSelectionChange={SetSelectedCity} // DIRECTLY CHANGES SELECTED VALUE

                onChange={handleSelectionChange}

                /*
                    when you use onSelectionChange dont use onChange & vice-a-versa, JUST ONE of them
                */


                defaultSelectedKeys={SelectedCity}
                // SETTING DEFAULT SELECTED KEY AS 1ST CITY
                label="Favorite City"
                placeholder="Select an City"

            >
                {
                    (options) => <SelectItem key={options.value} value={options.value}>
                        {/* LOOK HERE CLOSELY NO EVENTS APPLIED HERE*/}
                        {options.label}
                    </SelectItem>
                }
            </Select>
        </div>
    )
}

export default UseTable