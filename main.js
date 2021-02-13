let arr = [{
        "id": "1",
        "userName": "Олег Васильевич",
        "nickname": "vasil",
        "text": "Где детонатор?",
        "postDate": "02.14.2012, 05:00"
    },
    {
        "id": "2",
        "userName": "Brock",
        "nickname": "brock",
        "text": "По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.",
        "postDate": "02.05.2012, 13:27",
        "img": "https://fish-text.ru/images/logo.png",
        "likes": 50
    },
    {
        "id": "3",
        "userName": "Raamin",
        "nickname": "raamin",
        "text": "По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.",
        "postDate": "03.11.2012, 10:30",
        "likes": 999
    },
    {
        "id": "4",
        "userName": "Дональд",
        "nickname": "trampampam",
        "text": "Зарегался на вк, хороший сервис и не банят",
        "postDate": "02.05.2012, 13:27",
        "img": "https://i2.wp.com/media.globalnews.ca/videostatic/news/vamt80qbaq-94ovmaxjqg/trumptwitterupdate.jpg?w=500&quality=70&strip=all",
        "likes": 50

    },
    {
        "id": "5",
        "userName": "Олег Васильевич",
        "nickname": "vasil",
        "text": "Где детонатор?",
        "postDate": "02.14.2012, 05:00",
        "img": "https://www.meme-arsenal.com/memes/27606cb09d10f670389750cffb4d900d.jpg",
        "likes": 666
    },
    {
        "id": "6",
        "userName": "Raamin",
        "nickname": "raamin",
        "text": "По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.",
        "postDate": "03.11.2012, 10:30",
        "likes": 999
    }
]

class Twitter {
    constructor({
        listElem
    }) {
        this.tweets = new Posts();
        this.elements = {
            listElem: document.querySelector(listElem)
        }
    }
    renderPost() {

    }
    showUserPost() {

    }
    showLikesPost() {

    }
    showAllPost() {

    }
    openModal() {

    }
}

class Posts {
    constructor({ posts = arr } = {}) {
        this.posts = posts;
    }
    addPost(tweet) {
        const post = new Post(tweet);
        this.posts.push(post);
    }
    deletePost(id) {
        this.posts.filter((item, index, arr) => {
            if (item.id == id) {
                return this.posts.splice(index, 1)
            }
        })
    }
    likePost(id) {
        this.posts.filter((item => {
            if (item.id == id) {
                let post = new Post(tweet);
                post.changeLike()
            }
        }))
    }
}


class Post {
    constructor(param) {
        this.id = param.id;
        this.userName = param.userName;
        this.nikname = param.nikname;
        this.postDate = param.postDate;
        this.text = param.text;
        this.img = param.img;
        this.likes = param.likes;
        this.liked = false;
    }
    changeLike() {
        this.liked = !this.liked;
        if (this.liked) {
            this.likes++;
        } else {
            this.likes--;
        }
    }
}

let twitter = new Twitter({
    listElem: '.tweet-list'
})

twitter.tweets.addPost({
    id: 27,
    userName: "Aleh",
    nikname: 'krendil',
    postDate: new Date(),
    text: 'Hello',
    img: '+',
    likes: 77,
    liked: true,
})
twitter.tweets.deletePost(27);
twitter.tweets.likePost(6)
console.log(twitter);