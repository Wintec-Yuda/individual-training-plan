function generateColors(numColors) {
    var colors = [];
    for (var i = 0; i < numColors; i++) {
        colors.push(chroma.random().hex());
    }
    return colors;
}

function getMonthIndex(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth();
    return year * 12 + month;
}

let dataTable = null;
let dataRealization = null;
let labels = null;

if ($("#percentage").length) {
    let year = sessionStorage.getItem('selected');
    $.ajax({
        url: "http://localhost:8000/api/percentage/getPercentage",
        data: {'year':year},
        method: "get",
        dataType: "json",
        beforeSend: function () {
            $("#preload-lineChart").show();
        },
    })
        .done(function (data) {
            $("#preload-lineChart").hide();
            const counts = {};
            const dataByMonth = {};
            data.forEach(function (realization) {
                const month = new Date(realization.date).toLocaleString("default", { month: "short" });
                counts[month] = (counts[month] || 0) + 1;
                const monthIndex = getMonthIndex(realization.date);
                dataByMonth[monthIndex] = (dataByMonth[monthIndex] || 0) + 1;
            });

            let monthIndices = Object.keys(dataByMonth).sort();
            labels = monthIndices.map(function (monthIndex) {
                const date = new Date(Math.floor(monthIndex / 12), monthIndex % 12, 1);
                return date.toLocaleString("default", { month: "short" });
            });
            dataRealization = monthIndices.map(function (monthIndex) {
                return dataByMonth[monthIndex];
            });

            dataTable = {
                labels: labels,
                datasets: [
                    {
                        label: "Realizaton Training",
                        data: dataRealization,
                        backgroundColor: generateColors(1),
                        hoverOffset: 4,
                    },
                ],
            };
        })
        .done(function () {
            const id = $("#percentage");
            new Chart(id, {
                type: "line",
                data: dataTable,
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    min: 0,
                                    max: Math.max(...dataRealization),
                                    stepSize: 1,
                                },
                            },
                        ],
                    },
                },
            });
        });
}

// Organization chart

$("#preload-OrganizationChart").hide();
$("#organizationClick").click(function () {
    let organizationCanvas = $("#organizationChart");
    let dataOpenOrg = [];
    let dataRealizedOrg = [];
    let data = $("#organizationSearch").val();
    $.ajax({
        url: "http://localhost:8000/api/percentage/getPercentageDept/" + data,
        method: "get",
        dataType: "json",
        beforeSend: function () {
            $("#alertOrganization").hide();
            $("#preload-OrganizationChart").show();
            organizationCanvas.hide();
        },
    }).done(function (data) {
        $("#preload-OrganizationChart").hide();
        for (let i = 0; i < data["labels"].length; i++) {
            dataOpenOrg.push(data["dataOpen"][data["labels"][i]]);
            dataRealizedOrg.push(data["dataRealized"][data["labels"][i]]);
        }
        let densityDataOpen = {
            label: "Open Course",
            data: dataOpenOrg,
            backgroundColor: generateColors(dataOpenOrg.length),
            barPercentage: 0.9,
            categoryPercentage: 0.5,
        };
        let densityDataRealized = {
            label: "Realized Course",
            data: dataRealizedOrg,
            backgroundColor: generateColors(dataRealizedOrg.length),
            barPercentage: 0.9,
            categoryPercentage: 0.5,
        };

        let chartOptions = {
            scales: {
                xAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                        },
                    },
                ],
            },
            elements: {
                rectangle: {
                    borderSkipped: "left",
                },
            },
        };
        barChartOrg = new Chart(organizationCanvas, {
            type: "horizontalBar",
            data: {
                labels: data["labels"],
                datasets: [densityDataOpen, densityDataRealized],
            },
            options: chartOptions,
        });
        organizationCanvas.show();
    });
    $("#organizationSearch").val("");

    barChartOrg.destroy();
});

// Courses chart

$("#preload-CoursesChart").hide();
$("#courseClick").click(function () {
    let CoursesCanvas = $("#coursesChart");
    let dataOpenCourse = [];
    let dataRealizedCourse = [];
    let data = $("#coursesSearch").val();
    $.ajax({
        url: "http://localhost:8000/api/percentage/getPercentageCourses/" + data,
        method: "get",
        dataType: "json",
        beforeSend: function () {
            $("#alertCourse").hide();
            $("#preload-CoursesChart").show();
            CoursesCanvas.hide();
        },
    }).done(function (data) {
        $("#preload-CoursesChart").hide();
        for (let i = 0; i < data["labels"].length; i++) {
            dataOpenCourse.push(data["dataOpen"][data["labels"][i]]);
            dataRealizedCourse.push(data["dataRealized"][data["labels"][i]]);
        }

        let densityDataOpen = {
            label: "Open Course",
            data: dataOpenCourse,
            backgroundColor: generateColors(dataOpenCourse.length),
            barPercentage: 0.9,
            categoryPercentage: 0.5,
        };
        let densityDataRealized = {
            label: "Realized Course",
            data: dataRealizedCourse,
            backgroundColor: generateColors(dataRealizedCourse.length),
            barPercentage: 0.9,
            categoryPercentage: 0.5,
        };

        let chartOptions = {
            scales: {
                xAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                        },
                    },
                ],
            },
            elements: {
                rectangle: {
                    borderSkipped: "left",
                },
            },
        };

        barChartCourse = new Chart(CoursesCanvas, {
            type: "horizontalBar",
            data: {
                labels: data["labels"],
                datasets: [densityDataOpen, densityDataRealized],
            },
            options: chartOptions,
        });
        CoursesCanvas.show();
    });
    $("#coursesSearch").val("");
    barChartCourse.destroy();
});
