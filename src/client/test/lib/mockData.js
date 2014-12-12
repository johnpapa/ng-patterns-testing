/*jshint -W079, -W101, -W109 */
var mockData = (function() {
    return {
        getAvengers: getAvengers,
        getAvengersCast: getAvengersCast,
        getNewsStories: getNewsStories
    };

    function getAvengers() {
        return [
            {
                "id": 1017109,
                "name": "Black Widow/Natasha Romanoff (MAA)",
                "description": "Natasha Romanoff, also known as Black Widow, is a world-renowned super" +
                    " spy and one of S.H.I.E.L.D.\'s top agents. Her hand-to-hand combat skills, intelligence," +
                    " and unpredictability make her a deadly secret weapon. True to her mysterious nature," +
                    " Black Widow comes and goes as she pleases, but always appears exactly when her particular" +
                    " skills are needed.",
                "thumbnail": {
                    "path": "http://i.annihil.us/u/prod/marvel/i/mg/a/03/523219743a99b",
                    "extension": "jpg"
                }
            },
            {
                "id": 1017105,
                "name": "Captain America/Steve Rogers (MAA)",
                "description": "During World War II, Steve Rogers enlisted in the military and was injected" +
                    " with a super-serum that turned him into super-soldier Captain America! He\'s a" +
                    " skilled strategist and even more skilled with his shield, but it\'s his courage" +
                    " and good heart that makes Captain America both a leader and a true hero. ",
                "thumbnail": {
                    "path": "http://i.annihil.us/u/prod/marvel/i/mg/3/10/52321928eaa72",
                    "extension": "jpg"
                }
            },
            {
                "id": 1017108,
                "name": "Hawkeye/Clint Barton (MAA)",
                "description": "Hawkeye is an expert archer with an attitude just as on-target as his aim." +
                    " His stealth combat experience and his ability to hit any target with any projectile" +
                    " make him a valuable member of the Avengers. However, he refuses to let things get" +
                    " too serious, as he has as many jokes as he does arrows!",
                "thumbnail": {
                    "path": "http://i.annihil.us/u/prod/marvel/i/mg/4/03/5232198a81c17",
                    "extension": "jpg"
                }
            },
            {
                "id": 1017104,
                "name": "Iron Man/Tony Stark (MAA)",
                "description": "Tony Stark is the genius inventor/billionaire/philanthropist owner of Stark" +
                    " Industries. With his super high-tech Iron Man suit, he is practically indestructible," +
                    " able to fly, and has a large selection of weapons to choose from - but it\'s Tony\'s" +
                    " quick thinking and ability to adapt and improvise that make him an effective leader" +
                    " of the Avengers.",
                "thumbnail": {
                    "path": "http://i.annihil.us/u/prod/marvel/i/mg/2/d0/5232190d42df2",
                    "extension": "jpg"
                }
            },
            {
                "id": 1017106,
                "name": "Thor (MAA)",
                "description": "Thor is the Asgardian Prince of Thunder, the son of Odin, and the realm\'s" +
                    " mightiest warrior. He loves the thrill of battle and is always eager to show off his" +
                    " power to the other Avengers, especially the Hulk. Thor\'s legendary Uru hammer," +
                    " Mjolnir, gives him the power to control thunder and the ability to fly. He\'s found" +
                    " a new home on Earth and will defend it as his own... even if he doesn\'t understand" +
                    " its sayings and customs.",
                "thumbnail": {
                    "path": "http://i.annihil.us/u/prod/marvel/i/mg/2/03/52321948a51f2",
                    "extension": "jpg"
                }
            },
            {
                "id": 42,
                "name": "Spooky",
                "description": "Spooky has no known super power." +
                " He\'s just some guy that likes to run around with a sheet on his head.",
                "thumbnail": {
                    "path": "http://images.clipartpanda.com/ghost-clip-art-1216306562167833124lemmling_Cartoon_ghost.svg.med",
                    "extension": "png"
                }
            }
        ];
    }
    function getAvengersCast() {
        return [
          {"name": "Robert Downey Jr.", "character": "Tony Stark \/ Iron Man"},
          {"name": "John Papa", "character": "Spooky"},
          {"name": "Scarlett Johansson", "character": "Natasha Romanoff \/ Black Widow"},
          {"name": "Gwyneth Paltrow", "character": "Pepper Potts"},
        ];
    }
    function getNewsStories() {
        return [
            {title: 'Avengers Movies',
             description: 'The Avengers: Age of Ultron opens in U.S. theaters on May 1st'},
            {title: 'Avengers Romance',
             description: 'Ooo la la: are Dr. Banner and Natasha getting busy?'},
            {title: 'Marvel PSA',
             description: 'Earth\'s Mightiest Heroes Take a Stand in Avengers'},
            {title: 'Marvel TV',
             description: 'Marvel\'s Agent Carter Debriefs Her First 2 Missions'},
            {title: 'Marvel Comics',
             description: 'Thor: Meet the new female hero who will wield Mjolnir!'}
        ];
    }
})();
