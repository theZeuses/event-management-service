import * as dotenv from 'dotenv';

if (process.env.ENV) {
  dotenv.config({
    path: `.env.${process.env.ENV}.local`,
  });

  dotenv.config({
    path: `.env.${process.env.ENV}`,
  });

  if (process.env.ENV == 'development') {
    dotenv.config({
      path: '.env.local',
    });
    dotenv.config({
      path: '.env',
    });
  }
} else {
  dotenv.config({
    path: '.env.test.local',
  });

  dotenv.config({
    path: '.env.test',
  });

  dotenv.config({
    path: '.env.development.local',
  });

  dotenv.config({
    path: '.env.development',
  });

  dotenv.config({
    path: '.env.staging.local',
  });

  dotenv.config({
    path: '.env.staging',
  });

  dotenv.config({
    path: '.env.local',
  });
  dotenv.config({
    path: '.env',
  });
}
