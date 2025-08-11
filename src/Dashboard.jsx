import * as React from "react";

import TextField from "@mui/material/TextField";
import {alpha} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Header from "./components/Header";
import MainGrid from "./components/MainGrid";
import SideMenu from "./components/SideMenu";
import AppTheme from "./shared-theme/AppTheme";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {BACKEND_URL, REPO_URL, TOKEN} from "./constants";
import axios from "axios";
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from "./theme/customizations";
import {IndexContext} from "./IndexProvider"
import Reports from "./components/Reports";
import Issues from "./components/Issues";
import Positives from "./components/Positives";

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 400,
    bgcolor: "background.paper",
    p: 4,
};

export default function Dashboard(props) {
    const {selectedIndex, setSelectedIndex} = React.useContext(IndexContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setRepoIndex(0);
        setScanData(fullResponse[0])
    }
    const urlRef = React.useRef("");
    const tokenRef = React.useRef("");
    const [selectData, setSelectData] = React.useState([]);
    const [repoIndex, setRepoIndex] = React.useState(0);
    const [scanData, setScanData] = React.useState();
    const [fullResponse, setFullResponse] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        axios
            .get(`${BACKEND_URL}/all-scanned-repo`, {
                path: REPO_URL,
                token: TOKEN
            })
            .then((response) => {
                console.log(response.data)
                if (response.data.length > 0) {
                    setFullResponse(response.data);
                    let filtered = [];
                    response.data.map((item) => {
                        filtered.push(item["pomMetadata"]);
                    });
                    setSelectData(filtered);
                    setScanData(response.data[repoIndex])
                } else {
                    console.warn("empty response for all scanned repo");
                }
            });
    }, []);

    const handleIndexChange = (index) => {
        setScanData(fullResponse[index]);
        setRepoIndex(index)
    }

    const handleScanButton = () => {
        console.log(urlRef.current.value);
        console.log(tokenRef.current.value);
        setLoading(true)
        axios
            .put(`${BACKEND_URL}/scan-repo`, {
                repositoryPath: urlRef.current.value,
                token: tokenRef.current.value,
            })
            .then((response) => {
                setLoading(false)
                handleClose()
                console.log(response.data);
            })
            .catch((error) => {
                setLoading(false)
                console.log(error);
            });
    };

    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>

            <Header openModal={handleOpen} selectOptions={selectData} repoIndex={repoIndex}
                    setRepoIndex={handleIndexChange}/>

            <CssBaseline enableColorScheme/>


            <Box sx={{display: "flex"}}>
                <SideMenu openModal={handleOpen} selectOptions={selectData} repoIndex={repoIndex}
                          setRepoIndex={handleIndexChange}/>
                {/* <AppNavbar /> */}
                {/* Main content */}
                {
                    selectedIndex === 0 ?
                        <Box
                            component="main"
                            sx={(theme) => ({
                                flexGrow: 1,
                                backgroundColor: theme.vars
                                    ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                                    : alpha(theme.palette.background.default, 1),
                                overflow: "auto",
                            })}
                        >
                            <Stack
                                spacing={2}
                                sx={{
                                    alignItems: "center",
                                    mx: 3,
                                    pb: 5,
                                    mt: {xs: 8, md: 0},
                                }}
                            >
                                <MainGrid scanData={scanData}/>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    disableEnforceFocus
                                >
                                    <Box sx={style}>
                                        <Stack
                                            spacing={4}
                                            sx={{
                                                alignItems: "left",
                                            }}
                                        >
                                            <Typography
                                                id="modal-modal-title"
                                                variant="h6"
                                                component="h2"
                                            >
                                                Scan Repository
                                            </Typography>
                                            <TextField
                                                id="gitlab-url"
                                                label="GitLab URL"
                                                variant="filled"
                                                fullWidth
                                                inputRef={urlRef}
                                            />
                                            <TextField
                                                id="gitlab-access-token"
                                                label="Access Token"
                                                variant="filled"
                                                fullWidth
                                                type="password"
                                                inputRef={tokenRef}
                                            />
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={handleScanButton}
                                                loading={loading}
                                            >
                                                Start Scan
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Modal>
                            </Stack>
                        </Box>
                        :
                        selectedIndex === 1 ?
                            <Issues/> :
                            selectedIndex === 2 ?
                                <Positives/> :
                                <Reports/>
                }
            </Box>
        </AppTheme>
    );
}