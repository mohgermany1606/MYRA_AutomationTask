module.exports = {
    loginData: {
        username: 'admin',
        password: 'password'
    },
    validRoom: {
        roomNumber: 43432,
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
        roomNumber: 43432,
        type: 'Single',
        accessible: false,
        price: 120,
        features: ['Radio']
    }
};