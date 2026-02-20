class Building {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.services = [];
    }

    addService(service) {
        this.services.push(service);
    }
}

class Location {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.buildings = [];
        this.npcs = [];
        this.defaultBuildingCount = this.getDefaultBuildingCount();
    }

    getDefaultBuildingCount() {
        switch (this.type) {
            case 'Capital':
                return 16;
            case 'Town':
                return 12;
            case 'Port':
                return 10;
            default:
                return 0;
        }
    }

    addBuilding(name, buildingType) {
        if (this.buildings.length < this.defaultBuildingCount) {
            const building = new Building(name, buildingType);
            this.buildings.push(building);
        } else {
            console.log(`Cannot add more than ${this.defaultBuildingCount} buildings to ${this.type}`);
        }
    }

    addNPC(name) {
        this.npcs.push(name);
    }

    getServices() {
        return this.buildings.flatMap(building => building.services);
    }
}

// Example usage
const myCapital = new Location('MyCapital', 'Capital');
myCapital.addBuilding('Castle', 'Military');
myCapital.addBuilding('Library', 'Cultural');
myCapital.addNPC('Lord A');

const myTown = new Location('MyTown', 'Town');
myTown.addBuilding('Market', 'Commercial');
myTown.addNPC('Merchant B');

const myPort = new Location('MyPort', 'Port');
myPort.addBuilding('Dock', 'Transportation');
myPort.addNPC('Fisherman C');

console.log(myCapital, myTown, myPort);