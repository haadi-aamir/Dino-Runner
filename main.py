import pygame, sys
from class_w import World, Player, Enemy, Lava , Button

def main():
    pygame.init()
    game_over = 0
    menu = True
    tile_size = 50
    WIDHT = 1000 # 20 horizontal tiles
    HEIGHT = 650 # 13 vertical tiles
    Clock = pygame.time.Clock()
    fps = 60
    screen = pygame.display.set_mode((WIDHT, HEIGHT))

    bg = pygame.image.load("img/sky.png")
    bg = pygame.transform.scale(bg, (1000, 650))
    restart_img = pygame.image.load('img/restart_btn.png')
    exit_img = pygame.image.load('img/exit_btn.png')
    game_exit_img = pygame.transform.scale(exit_img, (100,45))
    start_img = pygame.image.load('img/start_btn.png')
    restart_btn = Button(WIDHT // 2 - 200 , HEIGHT // 2 - 50 , restart_img)
    game_exit_btn = Button(WIDHT // 2 + 100 , HEIGHT // 2 - 50 , game_exit_img)
    menu_exit_btn = Button(WIDHT // 2 + 100 , HEIGHT // 2 - 50 , exit_img)
    start_btn = Button(WIDHT // 2 - 300 , HEIGHT // 2 - 50 , start_img)
    
    

    world = world_data()
    world = World(world, tile_size, screen)
    player = Player(50, HEIGHT - 150, tile_size)
    
    
    # Game loop
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
                
        screen.blit(bg, (0, 0))
        if menu:
            if menu_exit_btn.draw(screen):
                pygame.quit()
                sys.exit()
            if start_btn.draw(screen):
                menu = False
            
        else:
            world.draw()
            if game_over == 0:
                Enemy.enemy_group.update()
            
            Lava.lava_group.draw(screen)
            Enemy.enemy_group.draw(screen)
            
            
            game_over = player.update(HEIGHT , screen , game_over)
        
            if game_over == -1:
                if restart_btn.draw(screen):
                    player.reset(50, HEIGHT - 150, tile_size)
                    game_over = 0
                if game_exit_btn.draw(screen):
                    pygame.quit()
                    sys.exit()

        Clock.tick(fps)
        pygame.display.update()


def world_data():
    with open("level1.txt", "r") as file:
        world_data = []
        for line in file:
            row = []
            for n in line.split(" "):
                row.append(int(n))
            world_data.append(row)
    return world_data


if __name__ == "__main__":
    main()
