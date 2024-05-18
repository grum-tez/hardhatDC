        
// @sp.add_test()
// def test():
//     # Create test accounts
//     alice = sp.test_account("Alice")
//     bob = sp.test_account("Bob")
//     eve = sp.test_account("Eve")

//     # Create a test scenario
//     scenario = sp.test_scenario("BattleContract", main)
//     c = main.BattleContract(battle_master_champion_id = 6)
//     scenario += c

//     # Test registering challengers with different champions
//     c.register_as_challenger(champion_id = 2, _sender = alice)  # gnat
//     c.register_as_challenger(champion_id = 3, _sender = bob)    # termite
//     c.register_as_challenger(champion_id = 7, _sender = eve)    # nano-bots

//     # Test the challenge_battlemaster function
//     c.challenge_battlemaster(_sender = alice)
//     c.challenge_battlemaster(_sender = bob)
//     c.challenge_battlemaster(_sender = eve)
