module.exports = {
    loginData: {
        username: 'admin',
        password: 'password'
    },
    validRoom: {
        roomNumber: 199,
        type: 'Double',
        accessible: 'true',
        price: 153,
        description: 'A cozy double room with a nice view.',
        features: ['WiFi', 'TV', 'Safe']
    },

    invalidRoom: {
        roomNumber: "",  // Invalid because the name is empty
        type: "Single",
        accessible: "true",
        price: "",      // Price field is also empty 
        features: ["WiFi", "TV"]
    },
    updatedRoom: {
        roomNumber: 199,
        type: 'Single',
        accessible: false,
        price: 120,
        //descriptionTextArea: "A compact single room for solo travelers.",
        features: ['Radio']
    }
};