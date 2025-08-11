import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChartUserByCountry from "./ChartUserByCountry";
import CustomizedTreeView from "./CustomizedTreeView";
import CustomizedDataGrid from "./CustomizedDataGrid";
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";
import AppTheme from "../shared-theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from "../theme/customizations";


const data = [
    {
        title: "Overall Compatiability",
        value: "278k",
        interval: "Last 30 days",
        trend: "up",
        data: [
            200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340,
            380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880,
        ],
    },
    {
        title: "Cyclomatic Complexity",
        value: "325",
        interval: "Last 30 days",
        trend: "down",
        data: [
            1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600,
            820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300,
            220,
        ],
    },
    {
        title: "Checkstyle issues",
        value: "200k",
        interval: "Last 30 days",
        trend: "neutral",
        data: [
            500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510,
            530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
        ],
    }
];

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};


export default function Reports({ scanData }) {
    return (
        <AppTheme themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{
                width: "100%", maxWidth: { sm: "100%", md: "100%" }, alignItems: "center",
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
            }}>

                <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                    Reports
                </Typography>

                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{ mb: (theme) => theme.spacing(2) }}
                >
                    <Grid size={{ xs: 12, md: 6 }}>
                        <SessionsChart />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <PageViewsBarChart />
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{ mb: (theme) => theme.spacing(2) }}
                >
                    <Grid size={{ xs: 12, lg: 12 }}>

                        <CustomizedDataGrid />
                    </Grid>
                </Grid>
            </Box>
        </AppTheme>
    );
}