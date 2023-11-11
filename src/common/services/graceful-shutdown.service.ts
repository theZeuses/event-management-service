import { BeforeApplicationShutdown, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GracefulShutdownService implements BeforeApplicationShutdown {
  constructor(private readonly logger: Logger) {}

  async beforeApplicationShutdown(signal?: string) {
    const timestamp = new Date().toISOString();
    const message = `Application is shutting down, signal: ${
      signal ?? 'N/A'
    }, timestamp: ${timestamp}`;

    this.logger.error(message);

    //Close open connections
    //to third party providers
    //when application exits
    return Promise.all([]);
  }
}
