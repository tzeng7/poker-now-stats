# name:
# vpip:
# 3b%
#
#
from collections import defaultdict

from Game import Game
from Hand import Hand
from Player import Player

pf = True
raises_pre = 0  # for measuring 3b statistics
game = Game()


with open("test.csv") as f:
    data = f.readlines()

    data.reverse()

    hand = Hand(1)
    for row in data:

        # new hand
        if "-- starting" in row:
            pf = True
            raises_pre = 0
            hand_number_index = row.index("#") + 1
            open_paren_index = row.index('(')
            hand_number = int(row[hand_number_index:open_paren_index-1].strip())
            hand = Hand(hand_number)

        # close hand
        elif "-- ending" in row:
            game.hands.append(hand)

        elif pf and "calls" in row:
            index = row.index("@")
            player_name = row[0:index].strip().strip('"')

            if not hand.player_in_hand(player_name):
                hand.players[player_name] = Player(player_name, True, False)

        elif pf and "raises" in row:

            index = row.index("@")
            player_name = row[0:index].strip().strip('"')

            if raises_pre == 1:
                if hand.player_in_hand(player_name):
                    hand.update_player(player_name, True, True)
                else:
                    hand.add_player(player_name, True, True)

            if not raises_pre and not hand.player_in_hand(player_name):
                hand.add_player(player_name, True, False)

            elif not raises_pre and not hand.player_in_hand(player_name):
                hand.add_player(player_name, True, True)

            raises_pre += 1

        elif pf and "folds" in row:
            index = row.index("@")
            player_name = row[0:index].strip().strip('"')

            if not hand.player_in_hand(player_name):
                hand.players[player_name] = Player(player_name, False, False)

        # end preflop stat collection
        elif "Flop" in row:
            pf = False

    print(game.show_hands())

totals = defaultdict(lambda: {
    'hands_played': 0,
    'vpip_count': 0,
    'three_bet_count': 0
})

for hand in game.hands:
    for player in hand.players.values():
        totals[player.player_name]['hands_played'] += 1
        if player.vpip:
            totals[player.player_name]['vpip_count'] += 1
        if player.three_bet:
            totals[player.player_name]['three_bet_count'] += 1

print(totals)








