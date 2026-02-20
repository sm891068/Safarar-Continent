const mapSystem = (() => {
    class Region {
        constructor(name) {
            this.name = name;
            this.connections = {};
        }
        connect(region, travelTime) {
            this.connections[region.name] = travelTime;
        }
    }

    class Location {
        constructor(name, type) {
            this.name = name;
            this.type = type; // type can be 'town', 'city', 'port'
        }
    }

    const regions = {};

    const addRegion = (name) => {
        if (!regions[name]) {
            regions[name] = new Region(name);
        }
    };

    const connectRegions = (region1, region2, travelTime) => {
        regions[region1].connect(regions[region2], travelTime);
        regions[region2].connect(regions[region1], travelTime); // bidirectional connection
    };

    const navigate = (startRegion, endRegion) => {
        // A simple navigation logic (more complex algorithms like Dijkstra's could be added)
        const travelTime = regions[startRegion].connections[endRegion];
        return travelTime ? `Travel time from ${startRegion} to ${endRegion} is ${travelTime} hours.` : `No connection found from ${startRegion} to ${endRegion}.`;
    };

    return {
        addRegion,
        connectRegions,
        navigate,
    };
})();

// Example Usage:
mapSystem.addRegion('Northeast');
mapSystem.addRegion('Southeast');
mapSystem.connectRegions('Northeast', 'Southeast', 2);
console.log(mapSystem.navigate('Northeast', 'Southeast')); // Logs the travel time
