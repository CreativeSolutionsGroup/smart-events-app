import 'dotenv/config';

export default {
  expo: {
    name: "smart-events-app",
    slug: "smart-events-app",
    scheme: "cusmartevents",
    owner: "creativesolutionscu",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "creativesolutions.smart-events-app",
      config: {
        googleSignIn: {
          reservedClientId: process.env.REVERSED_IOS_CLIENT_ID
        }
      },
      infoPlist: {
        NSLocationAlwaysAndWhenInUseUsageDescription: "App requires geolocation to validate check-in location",
        NSLocationAlwaysUsageDescription: "App requires geolocation to validate check-in location",
        NSLocationWhenInUseUsageDescription: "App requires geolocation to validate check-in location",
        UIBackgroundModes:[
          "location",
          "fetch"
        ]
      },
      googleServicesFile: "./GoogleService-Info.plist"
    },
    android: {
      package: "creativesolutions.smart_events_app",
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      permissions:[
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
        "ACCESS_FINE_LOCATION",
      ],
      useNextNotificationsApi: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    },
    plugins: [
      [
        "expo-notifications",
        {
          icon: "./local/assets/notification-icon.png",
          color: "#ffffff"
        }
      ]
    ]
  }
};
