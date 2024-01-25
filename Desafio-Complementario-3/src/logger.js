import winston from "winston"
import { config } from "../src/config/config.js";


const myCustomLevels = {

    levels: {

        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },

    colors: {

        fatal: "red",
        error: "red",
        warning: "yellow",
        info: "blue",
        http: "green",
        debug: "green"

    }


}




let logger

if (config.environment === "development") {



    logger = winston.createLogger({

        levels: myCustomLevels.levels,

        transports: [

            new winston.transports.Console({

                level: "debug",

                format: winston.format.combine(
                    winston.format.colorize({ colors: myCustomLevels.colors }),
                    winston.format.simple()
                )

            }),


        ]

    })

} else {

    logger = winston.createLogger({

        levels: myCustomLevels.levels,

        transports: [

            new winston.transports.Console({

                level: "info",

                format: winston.format.combine(
                    winston.format.colorize({ colors: myCustomLevels.colors }),
                    winston.format.simple()
                )



            }),

            new winston.transports.File({

                level: "error",

                filename: "error.log",

                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint()
                )

            })

        ]

    })



}

export { logger }
