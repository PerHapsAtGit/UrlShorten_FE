module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": [
                        "last 2 versions"
                    ]
                },
                "shippedProposals": true
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        ["@babel/transform-runtime", {
            "helpers": false,
            "regenerator": true
          }]
    ]
};