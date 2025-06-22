from Player import Player

class Hand:
    def __init__(self, number):
        self.players = {}
        self.number = number

    def player_in_hand(self, name):
        return name in self.players

    def show_players(self):

        for player in self.players.values():
            print(f'Hand Number {self.number}: Player Name: {player.player_name} VPIP: {player.vpip} 3B: {player.three_bet}')

    def add_player(self, name, vpip, three_bet):

        self.players[name] = Player(name, vpip, three_bet)

    def update_player(self, name, vpip=False, three_bet=False):
        player = self.players.get(name)
        if player:
            if vpip:
                player.vpip = vpip
            if three_bet:
                player.three_bet = three_bet
