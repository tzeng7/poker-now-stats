from collections import defaultdict

from Game import Game
from Hand import Hand
from Player import Player
from flask import Flask, jsonify, request
from flask_cors import CORS

def get_user(row) -> str:
    index = row.index("@")
    return row[0:index].strip().strip('"')

def process_csv(file):
    pf = True
    raises_pre = 0  # for measuring 3b statistics
    game = Game()

    # with open(file) as f:
    #     data = f.readlines()
    data = file.read().decode('utf-8').splitlines()
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
                
        elif "posts a small blind" in row or "posts a big blind" in row:
            player_name = get_user(row)
            hand.update_player(player_name, False, False, False)

        elif pf and "calls" in row:
            player_name = player_name = get_user(row)

            hand.update_player(player_name, True, False, False)
            
        elif pf and "raises" in row:
            player_name = get_user(row)
                
            #check if 3bet
            if raises_pre == 1:     
                hand.update_player(player_name, True, True, False)
            elif not raises_pre:
                hand.update_player(player_name, True, False, True)
                  
            raises_pre += 1
        elif pf and "folds" in row:
            player_name = get_user(row)

            hand.update_player(player_name, False, False, False)            
            
        # end preflop stat collection
        elif "Flop" in row:
            pf = False


    totals = defaultdict(lambda: {
        'hands_played': 0,
        'vpip_count': 0,
        'three_bet_count': 0,
        'pfr_count': 0
    })

    for hand in game.hands:
        for player in hand.players.values():
            totals[player.player_name]['hands_played'] += 1
            if player.vpip:
                totals[player.player_name]['vpip_count'] += 1
            if player.three_bet:
                totals[player.player_name]['three_bet_count'] += 1
            if player.pfr:
                totals[player.player_name]['pfr_count'] += 1

    # print(game.show_hands())

    return totals

# process_csv("poker_now_log_pglmlSXLmlxF48qixjvjgTcfa.csv")

app = Flask(__name__)
CORS(app)
@app.route("/upload", methods=['POST'])
def show_stats():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    stats = process_csv(file)
    return jsonify(stats)



