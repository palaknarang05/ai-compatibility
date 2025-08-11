File: components\MainGrid.jsx
import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Markdown from "react-markdown";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChartUserByCountry from "./ChartUserByCountry";
import Card from "@mui/material/Card";
import StatCard from "./StatCard";

const overallCompatiability = {
    title: "Overall Compatibility",
    value: "98%",
    interval: "Last 30 days",
    trend: "up",
};

const cyclomaticComplexity = {
    title: "Cyclomatic Complexity",
    value: "325",
    interval: "Last 30 days",
    trend: "down",
};


const checkSytleIssues = {
    title: "Checkstyle issues",
    value: "200k",
    interval: "Last 30 days",
    trend: "neutral",
};

export default function MainGrid({scanData}) {
    let data = []
    if(scanData && scanData['overallCompatibilityScores'].length > 0) {
        let ocs = {}
        ocs["title"] = "Overall Compatibility Score";
        ocs["value"] = scanData["overallCompatibilityScores"][scanData['overallCompatibilityScores'].length - 1];
        ocs["interval"] = "Last 30 days";
        ocs["data"] = scanData["overallCompatibilityScores"];

        let percentageDiff = (scanData["overallCompatibilityScores"][scanData['overallCompatibilityScores'].length - 1] - scanData["overallCompatibilityScores"][0]) / scanData["overallCompatibilityScores"][0] * 100;
        if(percentageDiff < -20) {
            ocs["trend"] = "down";
        } else if(percentageDiff < 20) {
            ocs["trend"] = "neutral";
        } else if(percentageDiff > 20) {
            ocs["trend"] = "up";
        }
        data.push(ocs)
    }

    if(scanData && scanData['cyclomaticComplexityScores'].length > 0) {
        let ocs = {}
        ocs["title"] = "Cyclomatic Complexity";
        ocs["value"] = scanData["cyclomaticComplexityScores"][scanData['cyclomaticComplexityScores'].length - 1];
        ocs["interval"] = "Last 30 days";
        ocs["data"] = scanData["cyclomaticComplexityScores"];

        let percentageDiff = ( scanData["cyclomaticComplexityScores"][scanData['cyclomaticComplexityScores'].length - 1] - scanData["cyclomaticComplexityScores"][0]) / scanData["cyclomaticComplexityScores"][0] * 100;

        if(percentageDiff < -20) {
            ocs["trend"] = "down";
        } else if(percentageDiff < 20) {
            ocs["trend"] = "neutral";
        } else if(percentageDiff > 20) {
            ocs["trend"] = "up";
        }
        data.push(ocs)
    }

    if(scanData && scanData['checkStyleIssueCounts'].length > 0) {
        let ocs = {}
        ocs["title"] = "Checkstyle Issues";
        ocs["value"] = scanData["checkStyleIssueCounts"][scanData['checkStyleIssueCounts'].length - 1] ;
        ocs["interval"] = "Last 30 days";
        ocs["data"] = scanData["checkStyleIssueCounts"];

        let percentageDiff = (scanData["checkStyleIssueCounts"][scanData['checkStyleIssueCounts'].length - 1] - scanData["checkStyleIssueCounts"][0]) / scanData["checkStyleIssueCounts"][0] * 100;

        if(percentageDiff < -20) {
            ocs["trend"] = "down";
        } else if(percentageDiff < 20) {
            ocs["trend"] = "neutral";
        } else if(percentageDiff > 20) {
            ocs["trend"] = "up";
        }
        data.push(ocs)
    }

    if(scanData && scanData['incompatibleFileCounts'].length > 0) {
        let ocs = {}
        ocs["title"] = "Incompatible Files";
        ocs["value"] = scanData["incompatibleFileCounts"][scanData['incompatibleFileCounts'].length - 1];
        ocs["interval"] = "Last 30 days";
        ocs["data"] = scanData["incompatibleFileCounts"];

        let percentageDiff = (scanData["incompatibleFileCounts"][scanData['incompatibleFileCounts'].length - 1] - scanData["incompatibleFileCounts"][0]) / scanData["incompatibleFileCounts"][0] * 100;

        if(percentageDiff < -20) {
            ocs["trend"] = "down";
        } else if(percentageDiff < 20) {
            ocs["trend"] = "neutral";
        } else if(percentageDiff > 20) {
            ocs["trend"] = "up";
        }
        data.push(ocs)
    }

    if (scanData === undefined || scanData == null) {
        return (
            <Box sx={{width: "100%", maxWidth: {sm: "100%", md: "1700px"}}}>
                <Typography component="h2" variant="h4" sx={{mb: 2}}>
                    No Data Available
                </Typography>
                <Typography component="p" variant="body1">
                    Please select a repository to view the overview.
                </Typography>
            </Box>
        )
    }
    return (
        <Box sx={{width: "100%", maxWidth: {sm: "100%", md: "1700px"}}}>

            <Typography component="h2" variant="h4" sx={{mb: 2}}>
                Overview
            </Typography>

            <Grid
                container
                spacing={2}
                columns={12}
                sx={{mb: (theme) => theme.spacing(2)}}
            >
                {data.map((card, index) => (
                    <Grid key={index} size={{xs: 12, sm: 6, lg: 3}}>
                        <StatCard {...card} />
                    </Grid>
                ))}
            </Grid>

            <Grid
                container
                spacing={2}
                columns={12}
                sx={{mb: (theme) => theme.spacing(2)}}
            >
                <Grid size={{xs: 12, lg: 9}}>

                    <Card
                        variant="outlined"
                        sx={{height: 525, flexGrow: 1, overflowY: "scroll"}}
                    >
                        <Typography component="h2" variant="h6" sx={{mb: 2}}>
                            Project Summary
                        </Typography>
                        <Typography component="div" variant="body1">
                            <Markdown>{scanData && scanData["executiveSummary"].replace("markdown", "").replaceAll("`", "")}</Markdown>
                        </Typography>
                    </Card>
                </Grid>
                <Grid size={{xs: 12, lg: 3}}>
                    <Stack gap={2} direction={{xs: "column", sm: "row", lg: "column"}}>
                        {scanData &&
                            <ChartUserByCountry languages={scanData.languages} linesOfCode={scanData.linesOfCode}/>}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}