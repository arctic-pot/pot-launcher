# <p align="center">Pot Launcher</p>

<p align="center">The modern and concise Minecraft launcher for developers and players </p>

## Introduce

Pot launcher is a modern Minecraft launcher support basic features, customizing features and development features.

No plugin interface - but the original launcher is OK

### Detail features

- boot game
- install Forge, Optifine, Server.jar, etc.
- Manage mods
- Manage resource packs

## About

Pot launcher is a TechPot International Project built with electron & react

Used UI framework of Material UI

### Why Electron?
For rapid update and iteration, we have to use C#, JS, etc.
For WPF, it's Windows-only. For Electron, it's cross-platform. 
We chose Electron at last.

### Privacy

Privacy is your right. We will defend that right for you.
Pot Launcher used AEC and two-factors of hash with salt for encrypt your access token, with a password set by your own, which is encrypted with SHA-224 and salt.
The decrypt token will be destroyed when you exit the launcher.

All salt used for encryption have 48 characters. 
Each character is randomly selected from all ASCII characters excluding space, backslash and double quote.

### Storage

We don't storage your account file and your launcher in the same directory.
Which means that your account data will be kept after you uninstall the launcher.

## Disclaimers

Pot Launcher is an opensource project made by TechPot Studio and licensed under MIT License.

TechPot Studio is an informal organization with no affiliation with Mojang Studios or Microsoft.
