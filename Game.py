class Game:
    def __init__(self):
        self.hands = []

    def show_hands(self):
        for h in self.hands:
            h.show_players()

