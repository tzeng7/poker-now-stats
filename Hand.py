from Player import Player

class Hand:
    def __init__(self, number):
        self.players = {}
        self.number = number

    def player_in_hand(self, name):
        return name in self.players

    def show_players(self):

        for player in self.players.values():
            print(f'Hand Number {self.number}: Player Name: {player.player_name} VPIP: {player.vpip} 3B: {player.three_bet} PFT: {player.pfr} ')

    def add_player(self, name, vpip, three_bet, pfr):

        self.players[name] = Player(name, vpip, three_bet, pfr)

    def update_player(self, name, vpip=False, three_bet=False, pfr=False):
        player = self.players.get(name)
        if player:
            if vpip:
                player.vpip = vpip
            if three_bet:
                player.three_bet = three_bet
            if pfr:
                player.pfr = pfr
