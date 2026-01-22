import React from "react";
import {Button} from "react-bootstrap";

export default function TestCount() {
    const [count, setCount] = React.useState(0);
    const handleCount = () => {
        setCount(count => count + 1);
    }
    return (
        <>
            <Button onClick={ handleCount } > Click to Count </Button>
            <p>Count: {count}</p>
     </>
    )
}