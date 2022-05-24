//defines coins constructor
export class Coin {
  constructor(
    id,
    name,
    symbol,
    current_price,
    image,
    total_supply,
    ath,
    ath_change_percentage,
    circulating_supply,
    market_cap_rank
  ) {
    this.id = id
    this.name = name
    this.symbol = symbol
    this.current_price = current_price
    this.image = image
    this.total_supply = total_supply
    this.ath = ath
    this.ath_change_percentage = ath_change_percentage
    this.circulating_supply = circulating_supply
    this.market_cap_rank = market_cap_rank
  }
}
