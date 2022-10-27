# zonemta-block-msp

Block sending to specific zone(s) on [ZoneMTA](https://github.com/zone-eu/zone-mta)

## Setup

Add this as a dependency for your ZoneMTA app

```
npm install @mindbaz/zonemta-block-msp --save
```

Add a configuration entry in the "plugins" section of your ZoneMTA app

Example [here](./config.example.toml).

First enable plugin :

```toml
# block-msp.toml
["modules/@mindbaz/zonemta-block-msp"]
enabled = "receiver"
```

Zone to block are defined in array
```toml
zone_block = ["zone1", "zone2"]
```