import React, { Component } from 'react'
import { Card, Row, Col, Tabs, Tab, Media, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import '../views/Views.css'

class ContentHowToPlay extends Component {

  constructor(props) {
    super(props)
    props.setTitle('How To Play')
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <div className="container-m-nx container-m-ny theme-bg-white mb-4" style={{
          // backgroundImage: `url('${process.env.PUBLIC_URL}/img/bg/img-26-01.jpg')`,
          backgroundImage: `url('${process.env.PUBLIC_URL}/img/cards/1.jpg')`,
          backgroundSize: "cover",
          backgroundPositionX: "center",
          backgroundPositionY: "center",
          // backgroundBlendMode: "luminosity",
        }}>
          <Media as={Col} md={10} lg={8} xl={7} className="py-5">
            <Media.Body className="ml-4">
              <h4 className="font-weight-bold mb-2 text-white h1">How To Play</h4>
              <div className="mb-4 text-white">Texas Hold’em Poker</div>
            </Media.Body>
          </Media>
          <hr className="m-0" />
        </div>

        <Row>
          <Col>
            <Card className="mb-4">
              <Card.Body className="py-2">
                <Tabs defaultActiveKey="1" className="font-weight-bold">
                  <Tab eventKey="1" title="Texas Hold’em Poker">
                    <Card.Body className="py-2 m-0">
                      <Row className="my-4">
                        <div className="text-left py-2">
                          <div className="row">
                            <div className="col pb-2 px-0">

                              <div className="footer-text font-weight-bold mb-3 h3">Texas Hold’em Poker</div>
                              <div className="">
                                Driven by the popularity of televised poker, Texas Hold'em (more commonly, ‘Hold'em’) has become the world’s most popular poker game, both in live casinos and online at MiMa Poker. We’ll go into more detail below, but here are the key points you need to know:
                                <br />
                                <br />
                                <ul>
                                  <li>Every player is dealt two cards, for their eyes only</li>
                                  <li>The dealer spreads five cards - three at once, then another, then another - which can be used by all players to make their best possible five-card hand</li>
                                  <li>Before and after each card(s) is revealed, players take turns to bet. To stay in the hand and see the next card, all players must have put the same amount of chips in the pot as each other</li>
                                  <li>The best poker hand wins the pot</li>
                                </ul>
                              </div>
                              <br />
                              <div className="">
                                It’s a simple game to learn, yet has the potential to be played with a seemingly infinite variety of strategies, tactics and nuance.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">The Rules of Texas Hold’em</div>
                              <div className="">
                                Before you begin playing Hold'em, you'll want to learn the rules. In Hold'em, each player is dealt two private cards (known as ‘hole cards’) that belong to them alone. Five community cards are dealt face-up, to form the ‘board’. All players in the game use these shared community cards in conjunction with their own hole cards to each make their best possible five-card poker hand. In Hold'em, a player may use any combination of the seven cards available to make the best possible five-card poker hand, using zero, one or two of their private hole cards. To view the rankings of poker hands, visit the poker hand ranks page.
                              </div>
                              <div className="">
                                The four major variations of Hold'em are distinguished from each other by their betting limits:
                                <br />
                                <br />
                                <ul>
                                  <li>Limit Texas Hold'em: There is a pre-determined betting limit on each round of betting.</li>
                                  <li>No Limit Texas Hold'em: A player can bet any amount, up to all of their chips.</li>
                                  <li>Pot Limit Texas Hold'em: A player can bet any amount, up to the size of the pot.</li>
                                  <li>Mixed Texas Hold'em: The game switches between rounds of Limit Texas Hold'em and No Limit Texas Hold'em.</li>
                                </ul>
                              </div>
                              <br />
                              <div className="">
                                Each of these Hold'em variations are available to play on MiMa Poker for free (play money) or for real money.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">How to Play Texas Hold'em</div>
                              <div className="">
                                To learn to play Hold'em using a hands-on method, MiMa Poker offers free poker games in the poker room. To start practicing your poker skills, just visit the free poker download page, install the award-winning poker software, and you'll be learning Hold'em in no time.
                              </div>
                              <br />
                              <div className="">
                                However, if you'd rather familiarize yourself with the rules of Hold'em first, then these instructions should help.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">The Blinds</div>
                              <div className="">
                                In Hold'em, a marker called ‘the button’ or ‘the dealer button’ indicates which player is the nominal dealer for the current game. Before the game begins, the player immediately clockwise from the button posts the "small blind", the first forced bet. The player immediately clockwise from the small blind posts the "big blind", which is typically twice the size of the small blind, but the blinds can vary depending on the stakes and betting structure being played.
                              </div>
                              <br />
                              <div className="">
                                In Limit games, the big blind is the same as the small bet, and the small blind is typically half the size of the big blind but may be larger depending on the stakes. For example, in a $2/$4 Limit game the small blind is $1 and the big blind is $2. In a $15/$30 Limit game, the small blind is $10 and the big blind is $15.
                              </div>
                              <br />
                              <div className="">
                                In Pot Limit and No Limit games, the games are referred to by the size of their blinds (for example, a $1/$2 Hold’em game has a small blind of $1 and a big blind of $2).
                              </div>
                              <br />
                              <div className="">
                                Depending on the exact structure of the game, each player may also be required to post an ‘ante’ (another type of forced bet, usually smaller than either blind, posted by all players at the table) into the pot.
                              </div>
                              <br />
                              <div className="">
                                Now, each player receives his or her two hole cards. Betting action proceeds clockwise around the table, starting with the player ‘under the gun’ (immediately clockwise from the big blind).
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Player Betting Options</div>
                              <div className="">
                                In Hold'em, as with other forms of poker, the available actions are ‘fold’, ‘check’, ‘bet’, ‘call’ or ‘raise’. Exactly which options are available depends on the action taken by the previous players. If nobody has yet made a bet, then a player may either check (decline to bet, but keep their cards) or bet. If a player has bet, then subsequent players can fold, call or raise. To call is to match the amount the previous player has bet. To raise is to not only match the previous bet, but to also increase it.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Pre-Flop</div>
                              <div className="">
                                After seeing his or her hole cards, each player now has the option to play his or her hand by calling or raising the big blind. The action begins to the left of the big blind, which is considered a ‘live’ bet on this round. That player has the option to fold, call or raise. For example, if the big blind was $2, it would cost $2 to call, or at least $4 to raise. Action then proceeds clockwise around the table.
                              </div>
                              <br />
                              <div className="">
                                Note: The betting structure varies with different variations of the game. Explanations of the betting action in Limit Hold'em, No Limit Hold'em, and Pot Limit Hold'em can be found below.
                              </div>
                              <br />
                              <div className="">
                                Betting continues on each betting round until all active players (who have not folded) have placed equal bets in the pot.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">The Flop</div>
                              <div className="">
                                Now, three cards are dealt face-up on the board. This is known as ‘the flop’. In Hold'em, the three cards on the flop are community cards, available to all players still in the hand. Betting on the flop begins with the active player immediately clockwise from the button. The betting options are similar to pre-flop, however if nobody has previously bet, players may opt to check, passing the action to the next active player clockwise.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">The Turn</div>
                              <div className="">
                                When the betting action is completed for the flop round, the ‘turn’ is dealt face-up on the board. The turn is the fourth community card in Hold'em (and is sometimes also called ‘Fourth Street’). Another round of betting ensues, beginning with the active player immediately clockwise from the button.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">The River</div>
                              <div className="">
                                When betting action is completed for the turn round, the ‘river’ or ‘Fifth Street’ is dealt face-up on the board. The river is the fifth and final community card in a Hold'em game. Betting again begins with the active player immediately clockwise from the button, and the same betting rules apply as they do for the flop and turn, as explained above.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">The Showdown</div>
                              <div className="">
                                If there is more than one remaining player when the final betting round is complete, the last person to bet or raise shows their cards, unless there was no bet on the final round in which case the player immediately clockwise from the button shows their cards first. The player with the best five-card poker hand wins the pot. In the event of identical hands, the pot will be equally divided between the players with the best hands. Hold'em rules state that all suits are equal.
                              </div>
                              <br />
                              <div className="">
                                After the pot is awarded, a new hand of Hold'em is ready to be played. The button now moves clockwise to the next player, blinds and antes are once again posted, and new hands are dealt to each player.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Limit, No Limit, Pot Limit and Mixed Texas Hold'em</div>
                              <div className="">
                                Hold'em rules remain the same for Limit, No Limit and Pot Limit poker games, with a few exceptions:
                                <br />
                                <br />
                                <ul>
                                  <li>
                                    <strong>Limit Texas Hold'em</strong>
                                    <div>
                                      Betting in Limit Hold'em is in pre-determined, structured amounts. Pre-flop and on the flop, all bets and raises are of the same amount as the big blind. On the turn and the river, the size of all bets and raises doubles. In Limit Hold'em, up to four bets are allowed per player during each betting round. This includes a (1) bet, (2) raise, (3) re-raise, and (4) cap (final raise).
                                    </div>
                                  </li>
                                  <br />
                                  <li>
                                    <strong>No Limit Texas Hold'em</strong>
                                    <div>
                                      The minimum bet in No Limit Hold'em is the same as the size of the big blind, but players can always bet as much more as they want, up to all of their chips. Minimum raise: In No Limit Hold'em, the raise amount must be at least as much as the previous bet or raise in the same round. As an example, if the first player to act bets $5 then the second player must raise a minimum of $5 (total bet of $10). Maximum raise: The size of your stack (your chips on the table). In No Limit Hold'em, there is no ‘cap’ on the number of raises allowed.
                                    </div>
                                  </li>
                                  <br />
                                  <li>
                                    <strong>Pot Limit Texas Hold'em</strong>
                                    <div>
                                      The minimum bet in Pot Limit Hold'em is the same as the size of the big blind, but players can always bet up to the size of the pot. Minimum raise: The raise amount must be at least as much as the previous bet or raise in the same round. As an example, if the first player to act bets $5 then the second player must raise a minimum of $5 (total bet of $10). Maximum raise: The size of the pot, which is defined as the total of the active pot plus all bets on the table plus the amount the active player must first call before raising. Example: If the size of the pot is $100, and there is no previous action on a particular betting round, a player may bet a maximum of $100. After that bet, the action moves to the next player clockwise. That player can either fold, call $100, or raise any amount between the minimum ($100 more) and the maximum. The maximum bet in this case is $400 - the raiser would first call $100, bringing the pot size to $300, and then raise $300 more, making a total bet of $400. In Pot Limit Hold'em, there is no ‘cap’ on the number of raises allowed.
                                    </div>
                                  </li>
                                  <br />
                                  <li>
                                    <strong>Mixed Texas Hold'em</strong>
                                    <div>
                                      In Mixed Hold'em, the game switches between rounds of Limit Hold'em and No Limit Hold'em. The blinds are typically increased when the game switches from No Limit to Limit, to ensure some consistency in the average pot size in each game. The betting rules on each round follow the rules for that game, as described above.
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <br />
                              <div className="">
                                In the MiMa Poker software, it’s not possible to bet less than the minimum or more than the maximum. The bet slider and bet window will only allow you to bet amounts within the allowed thresholds.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Learn How to Play Texas Hold'em for Free</div>
                              <div className="">
                                If you want to learn how to play Hold'em, then download the MiMa Poker software and join any of the free poker games where you can play online against other players. Unlike our real money poker games, since there is nothing at stake, you can be comfortable learning the ropes of the game and all the rules of Hold'em. We hope to see you in our poker room, and good luck at the tables!
                              </div>
                              <br />
                              <div className="">
                                As well as Texas Hold’em, we also offer many other poker variants. See our Poker Games page to learn more.
                              </div>
                              <br />
                              <div className="">
                                Thanks for visiting our guide to Hold'em at MiMa Poker. If you have any queries, please visit our Help Center as this is the most efficient route to getting your questions answered.
                              </div>
                              <br />

                            </div>

                          </div>
                        </div>
                      </Row>
                    </Card.Body>
                  </Tab>
                  <Tab eventKey="2" title="The Rules of Online Poker">
                    <Card.Body className="py-2 m-0">
                      <Row className="my-4">
                        <div className="text-left py-2">
                          <div className="row">
                            <div className="col pb-2 px-0">

                              <div className="footer-text font-weight-bold my-3 h3">How Do You Win?</div>
                              <div className="">
                                Typically, the winner of each hand of poker is the player that holds the highest ranked hand when all cards are shown at the end of the hand –known as the ‘showdown’ – or the player that makes the last uncalled bet, thus winning without needing to reach a showdown.
                              </div>
                              <br />
                              <div className="">
                                Not sure whether a flush beats a straight? Can’t remember how to make a full house? You can find all the information you need to know about hand rankings in the table below (click here for more). The strongest hands are in the top row, running from left to right, with the weakest possible hand being simply a high card.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Getting Started</div>
                              <div className="">
                                Poker games typically feature a forced bet, such as the Big Blind and Small Blind in Hold’em and Omaha. These forced bets comprise the starting pot in any given hand of poker, which is the first incentive players have to win the hand. Action arising from the subsequent rounds of betting further increases the size of the pot.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Dealing Cards and Betting Rounds</div>
                              <div className="">
                                After any initial cards are dealt, players are usually called upon to act in turn, moving clockwise around the table.
                              </div>
                              <br />
                              <div className="">
                                Each player can usually take one of the following actions when it is their turn to act:
                                <br />
                                <br />
                                <ul>
                                  <li>
                                    <strong>Check –</strong> To check is to decline the opportunity to open the betting. Players can only check when there is no bet during the current round, and the act of checking passes the action clockwise to the next person in the hand. If all active players check, those players remain in the hand and the round is considered complete.
                                  </li>
                                  <li>
                                    <strong>Bet –</strong> Players may bet if no other players have bet during the current round. Once a bet has been made, other players must ‘call’ by matching the amount bet, in order to remain in the hand.
                                  </li>
                                  <li><strong>Fold –</strong> Players who fold forfeit their cards and cannot win or act again during the current hand.</li>
                                  <li><strong>Call –</strong> Players can call if other players have bet during the current round; this requires the calling player to match the highest bet made.</li>
                                  <li>
                                    <strong>Raise –</strong> Players may raise if other players have bet during the current round; this requires the raising player to match the highest bet made, and then make a greater one. All subsequent players are required to call the raise or raise again (‘re-raise’) to stay in the hand.
                                  </li>
                                </ul>
                              </div>
                              <br />
                              <div className="">
                                Different variants of poker have different betting rounds. Texas Hold’em and Omaha are the two most popular poker games in the world and have identical betting structures, with four rounds of betting known as pre-flop, the flop, the turn and the river.
                              </div>
                              <br />
                              <div className="">
                                The pre-flop betting round begins as soon as all players have received their hole cards, before any community cards have been dealt; betting on the flop occurs after the first three community cards are dealt; on the turn after the fourth community card; and on the river after the fifth and final community card.
                              </div>
                              <br />
                              <div className="">
                                On each betting round, betting continues until every player has either matched the bets made or folded (if no bets are made, the round is complete when every player has checked). When the betting round is completed, the next dealing/betting round begins, or the hand is complete.
                              </div>
                              <br />
                              <div className="">
                                Here’s an example of a Texas Hold’em hand after all the cards have been dealt. As you can see, players may use any of their two hole cards with any of the five community cards to make the best five-card hand they can make - in this case, you can use both your hole cards and three of the shared community cards to make a straight.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Showdown</div>
                              <div className="">
                                Once the last bet or raise has been called during the final round of betting, a showdown occurs; the remaining active players must show or ‘declare’ their hands, and the player(s) with the best ranking hand(s) win the pot.
                              </div>
                              <br />
                              <div className="">
                                Players often show their hands in order, rather than all at the same time. Multiple players can share a single pot, with the pot divided in different ways depending on the game rules and how each player’s hand ranks against their opponents.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Betting Limits</div>
                              <div className="">
                                Betting limits refer to the amount players may open and raise. Typically, poker games are of the following types; no limit, pot limit or fixed limit.
                                <br />
                                <br />
                                <ul>
                                  <li><strong>No Limit –</strong> in poker games with a no limit betting structure, each player can bet or raise by any amount up to and including their full stack (the total number of chips they possess at any given time) in any betting round, whenever it is their turn to act.</li>
                                  <li><strong>Pot Limit –</strong> in poker games with a pot limit betting structure, each player can bet or raise by any amount up to and including the size of the total pot at that time.</li>
                                  <li><strong>Fixed Limit –</strong> in poker games with a fixed limit betting structure, each player can choose to call, bet or raise, but only by a fixed amount. The fixed amount for any given betting round is set in advance.</li>
                                </ul>
                              </div>
                              <br />
                              <div className="">
                                For No Limit and Pot Limit games, the ‘Stakes’ column in the MiMa Poker lobby indicates the Small Blind and Big Blind in that game, while for Mixed Games, the Stakes listed in the lobby are the betting amounts for Limit games; in Pot Limit and No Limit rounds, the blinds are usually half of the blinds in limit games.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Table Stakes and All-in</div>
                              <div className="">
                                You may have seen a poker scene in a movie or on TV where a player is faced with a bet for more chips than they have at the table, and is forced to wager a watch, a car or some other possession in order to stay in the hand. This may make for good drama, but it is not generally the way poker is played in real life!
                              </div>
                              <br />
                              <div className="">
                                All games on our site are played ‘table stakes’, meaning only the chips in play at the beginning of each hand can be used during the hand. The table stakes rule has an application called the ‘All-In’ rule, which states that a player cannot be forced to forfeit a poker hand because the player does not have enough chips to call a bet.
                              </div>
                              <br />
                              <div className="">
                                A player who does not have enough chips to call a bet is declared All-In. The player is eligible for the portion of the pot up to the point of his final wager. All further action involving other players takes place in a ‘side pot’, which the All-In player is not eligible to win. If more than one player goes All-In during a hand, there could be more than one side pot.
                              </div>
                              <br />
                              <div className="">
                                Now you’ve got the rules, what’s stopping you? Download and play!
                              </div>
                              <br />
                              <div className="">
                                If you have any queries, please contact our Help Center as this is the most efficient route to getting your questions answered.
                              </div>
                              <br />

                            </div>
                          </div>
                        </div>
                      </Row>
                    </Card.Body>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={4}>
            <Card className="mb-4">
              <Card.Body>
                <Button variant="primary" className="mr-2" onClick={() => { this.props.history.push("/games") }}>Live Games</Button>
                <Button variant="default" className="mr-2" onClick={() => { this.props.history.push("/content/howtoplay") }}>How to play</Button>
              </Card.Body>

              <hr className="border-light m-0" />

              <Card.Body className="my-0 py-0">

                <img src={`${process.env.PUBLIC_URL}/img/cards/2.jpg`} className="d-block img-fluid my-0 py-0" alt="" style={{
                  height: "120px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  width: "min-content",
                }} />

              </Card.Body>

              <Card.Body>
                <div className="footer-text font-weight-bold mb-3 h3">Responsible Gaming</div>
                <div className="">
                  We are committed to responsible gaming, and are dedicated to an enjoyable and positive gaming experience.
                </div>
                < br />
                <div className="">
                  <Link to="/content/responsible" className="text-white font-weight-bold">Get more information</Link>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header className="with-elements">
                <span className="card-header-title">Help Center &nbsp;
                </span>
                <div className="card-header-elements ml-md-auto">
                  <Link to="/content/help" className="btn btn-default md-btn-flat btn-xs">Show All</Link>
                </div>
              </Card.Header>

              <Row noGutters className="row-bordered row-border-light">
                <Link to="/content/deposits" className="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <div className="display-4 text-primary my-4"><i className="lnr lnr-briefcase text-big"></i></div>
                  <div className="text-center small">Deposits & Withdrawals</div>
                </Link>
                <Link to="/content/responsible" className="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <div className="display-4 text-primary my-4"><i className="lnr lnr-thumbs-up text-big"></i></div>
                  <div className="text-center small">Responsible Gaming</div>
                </Link>
                <Link to="/content/howtoplay" className="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <div className="display-4 text-primary my-4"><i className="lnr lnr-dice text-big"></i></div>
                  <div className="text-center small">How to play</div>
                </Link>
                <Link to="/content/terms" className="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <div className="display-4 text-primary my-4"><i className="lnr lnr-earth text-big"></i></div>
                  <div className="text-center small">Terms of Service</div>
                </Link>
                <Link to="/content/privacy" className="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <div className="display-4 text-primary my-4"><i className="lnr lnr-lock text-big"></i></div>
                  <div className="text-center small">Privacy Policy</div>
                </Link>
                <Link to="/content/support" className="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <div className="display-4 text-primary my-4"><i className="lnr lnr-bubble text-big"></i></div>
                  <div className="text-center small">Support</div>
                </Link>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ContentHowToPlay