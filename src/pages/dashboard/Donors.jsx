import { Button } from '@mui/material';
import React from 'react';

const Donors = (props) => {
    
    return (
        <div className="flex flex-col p-5 gap-2 border rounded-md bg-slate-100 shadow-xl min-w-80 w-fit select-none">
            <span className="text-md font-semibold"> {props.name} </span>
            <span className="text-white bg-slate-700 p-2 rounded-md w-fit text-lg font-bold"> {props.distance} KMs </span>
            <Button> Sent Request </Button>
        </div>
    );
}

export default Donors;
