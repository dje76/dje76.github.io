function initGraphs(graph_data) {
    var exceptions_chart = new CanvasJS.Chart("exChartContainer",
    {
      animationEnabled: false,
      data: [
      {
        type: "doughnut",
        startAngle: 0,
        toolTipContent: "{legendText}: {y} - <strong>#percent% </strong>",
        showInLegend: false,
        dataPoints: [
          {y: graph_data.exception_no_1, legendText: graph_data.exception_1 },
          {y: graph_data.exception_no_2, legendText: graph_data.exception_2 },
          {y: graph_data.exception_no_3, legendText: graph_data.exception_3 },
          {y: graph_data.exception_no_4, legendText: graph_data.exception_4 },
          {y: graph_data.exception_no_5, legendText: graph_data.exception_5 },
          {y: graph_data.exception_no_6, legendText: graph_data.exception_6 },
          {y: graph_data.exception_no_7, legendText: graph_data.exception_7 },
          {y: graph_data.exception_no_8, legendText: graph_data.exception_8 }
        ]
      }
      ]
    });
    exceptions_chart.render();

    var chart = new CanvasJS.Chart("barChartContainer", {
      theme: "theme2",
      animationEnabled: false,
      data: [
      {
        type: "column",
        dataPoints: [
          { label: "Tue", y: graph_data.packages_late_1  },
          { label: "Wed", y: graph_data.packages_late_2  },
          { label: "Thu",  y: graph_data.packages_late_3  },
          { label: "Fri",  y: graph_data.packages_late_4  },
          { label: "Sat",  y: graph_data.packages_late_5  },
          { label: "Mon",  y: graph_data.packages_late_6  },
          { label: "Today",  y: graph_data.packages_late_7  }
        ]
      }
      ]
    });
    chart.render();
  }

  function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 34.04924594193164, lng: -118.24104309082031},
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
    styles: [
      {
        "featureType": "poi",
        "stylers": [
          { "visibility": "off" }
        ]
      },
      {
        featureType: "administrative",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ]
  });
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
  }
