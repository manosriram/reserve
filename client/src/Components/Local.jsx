import React, { Fragment } from "react";
import {
    Tooltip,
    Icon,
    Divider,
    Popover,
    Card,
    Elevation,
    MenuItem,
    Menu,
    Position,
    Button
} from "@blueprintjs/core";
import { FocusStyleManager } from "@blueprintjs/core";
const ClipboardJS = require("clipboard");
var clipboard = new ClipboardJS('#copy');
var moment = require('moment');

const bytesToMegaBytes = bytes => {
    return (bytes / (1024 * 1024)).toFixed(3);
};

const Local = props => {
    FocusStyleManager.onlyShowFocusOnTabs();

   React.useEffect(() => {
       var updatedData = [];
       const data = JSON.parse(localStorage.getItem("session"));
       updatedData = data.filter(file => file.expires > new Date().getTime());
       localStorage.setItem("session", JSON.stringify(updatedData));
    });

    return (
        <Fragment>
        {JSON.parse(localStorage.getItem("session")).length > 0 && (
            <>
                <h3>Previous unexpired uploads</h3>
                <Divider />
            </>
        )}
            {props.data.map(lst => {
                const now = new Date().getTime();
                console.log(moment.utc("2018-02-21 23:31:49.391"));
                if (lst.expires > now) {
                return (
                <div id="uponRoot">
                    <div id="upon">
                        {lst.files.length && (
                            <>
                                <div id="mm" class="bp3-dark bp3-card ">
                                    <h5 id="archive" class="bp3-heading">
                                        <Icon icon="document" />
                                        {"  "}
                                        Archive.zip{" "}
                                        <p id="size">
                                            {bytesToMegaBytes(lst.totalSize)} MB
                                        </p>
                                    </h5>
                                    <Popover
                                        content={lst.files.map(ln => (
                                            <>
                                                <Menu text={ln.name}>
                                                    {ln.name}
                                                </Menu>
                                                <Divider />
                                            </>
                                        ))}
                                        position={Position.BOTTOM}
                                    >
                                        <Button
                                            icon="chevron-down"
                                            text={lst.files.length + " file" + (lst.files.length > 1 ? "s" : "")}
                                        />
                                    </Popover>
                                    <a id="down" href={"download/" + lst.url}>
                                        <Icon
                                            icon="cloud-download"
                                            iconSize={30}
                                        />
                                    </a>
                            <Popover id="down" content="Copied!" position={Position.RIGHT}>
                                    <Tooltip position={Position.RIGHT}>
                                        <Icon
                                            data-clipboard-text={window.location.href + "download/" + lst.url}
                                            id="copy"
                                            icon="duplicate"
                                            iconSize={25}
                                        />
                                    </Tooltip>
                            </Popover>
                                </div>
                            </>
                        )}
                        <br />
                    </div>
                </div>
                );
            }
            })}
        </Fragment>
    );
};

export default Local;

/*
 *
 *
            <div id="mm" class="bp3-dark bp3-card ">
                <h5 class="bp3-heading">
                    <Icon icon="document" />
                    {"  "}
                    Archive.zip{" "}
                </h5>
        <span>&nbsp;&nbsp;</span>

                <Popover content={lst.files.map(ln => <Menu text={ln.name}>{ln.name}</Menu>)} position={Position.BOTTOM}>
                    <Button icon="arrow-down" text={lst.files.length + " files"} />
                </Popover>
                <Icon id="down" icon="cloud-download" iconSize={25}/>
            </div>
*/
