import React, { Fragment, useState } from "react";
import Download from "./Download";
import { useLocation } from "react-router-dom";

const List = props => {
    const [ld, isld] = useState(false);
    let loc = useLocation();
    const getDecryptURL = async () => {
        const url = loc.pathname.split("/")[2];
        const resp = await fetch("/file/decryptFile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: url })
        });
        const data = await resp.json();
        console.log(data);
        isld(false);
    };

    React.useEffect(() => {
        isld(true);
        getDecryptURL();
    }, []);

    const handleDownload = async () => {
        const resp = await fetch("/file/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: props.half })
        });
        const data = await resp.json();
    };

    if (ld) return <i className="fa fa-refresh fa-spin"></i>
    else {
    return (
        <Fragment>
        {props.names.map(name => {
            return (
                <Fragment>
                <h4>{name}</h4>
                </Fragment>
            );
        })}
        <br />
        <a href="#" onClick={handleDownload}>down</a>
        </Fragment>
    );
    }
};

export default List;