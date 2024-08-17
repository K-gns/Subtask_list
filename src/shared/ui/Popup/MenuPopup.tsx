import {classNames} from "shared/lib/classNames/classNames";
import cls from './Popup.module.scss'
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import {IconButton} from "@mui/material";

interface PopupProps {
    className?: string;
    Menu1Name: string;
    Menu1Func: any;
    Menu2Name?: string;
    Menu2Func?: any;
    Menu3Name?: string;
    Menu3Func?: any;
}

export const MenuPopup = ({
                              className,
                              Menu1Name,
                              Menu1Func,
                              Menu2Name,
                              Menu2Func,
                              Menu3Name,
                              Menu3Func
                          }: PopupProps) => {

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState: any) => (
                <>
                    <IconButton
                        onClick={(event) => {
                            event.stopPropagation();
                            popupState.open(event);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-more-horizontal"
                        >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                    </IconButton>

                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            Menu1Func();
                        }}>{Menu1Name}</MenuItem>
                        {Menu2Name && <MenuItem onClick={() => {
                            popupState.close;
                            Menu2Func;
                        }}>ToDo</MenuItem>}
                        {Menu3Name && <MenuItem onClick={() => {
                            popupState.close;
                            Menu3Func;
                        }}>ToDo</MenuItem>}
                    </Menu>
                </>
            )}
        </PopupState>
    );
};