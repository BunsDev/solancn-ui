import { highlighter } from "@/src/utils/highlighter"
import { logger } from "@/src/utils/logger"
import { z } from "zod"

// Check if running in test environment
const isTestEnvironment = () => {
  return process.env.NODE_ENV === 'test' || 
         process.env.VITEST !== undefined || 
         process.env.TEST === 'true'
}

export function handleError(error: unknown) {
  logger.error(
    `Something went wrong. Please check the error below for more details.`
  )
  logger.error(`If the problem persists, please open an issue on GitHub.`)
  logger.error("")
  
  // Create an error to potentially throw in test environment
  let errorToThrow: Error
  
  if (typeof error === "string") {
    logger.error(error)
    logger.break()
    errorToThrow = new Error(error)
  } else if (error instanceof z.ZodError) {
    logger.error("Validation failed:")
    for (const [key, value] of Object.entries(error.flatten().fieldErrors)) {
      logger.error(`- ${highlighter.info(key)}: ${value}`)
    }
    logger.break()
    errorToThrow = error
  } else if (error instanceof Error) {
    logger.error(error.message)
    logger.break()
    errorToThrow = error
  } else {
    logger.break()
    errorToThrow = new Error("Unknown error occurred")
  }
  
  // In test environment, throw the error instead of exiting
  if (isTestEnvironment()) {
    throw errorToThrow
  } else {
    // In production environment, exit the process
    process.exit(1)
  }
}
