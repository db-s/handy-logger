
/***********************USAGE******************************/
/*       _______________________________________________________________________________________________
*       |                                                                                               |
*       | const logger = new Logger({datePattern : "MM-DD-YYYY"});                                      |
*       | logger.log({level : "info", message : "This is an info test", title : "LOGGER INFO LOGS"});   |
*       | logger.log({level : "error", message : "This is an error test", title : "LOGGER ERROR LOGS"});|
*       | logger.log({level : "warn", message : "This is an warning test", title : "LOGGER WARN LOGS"});|
*       | logger.log({level : "debug", message : "This is an debug test", title : "LOGGER DEBUG LOGS"});|
*       | let res = logger.queryLog("warn");                                                            |
*       | console.log(res)                                                                              |
*       |_______________________________________________________________________________________________|
*/

export { Logger } from './logger';
