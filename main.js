class FetchData {
    getResourse = async url => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Произошда ошибка ' + res.status)
        }
        return res.json();
    }
    getPost = () => {
        return this.getResourse('db/dataBase.json')
    }
}

class Twitter {
    constructor({
        listElem,
        modalElems,
        tweetElems,
        user
    }) {
        this.user = user;
        const fetchData = new FetchData()
        this.tweets = new Posts();
        this.elements = {
            listElem: document.querySelector(listElem),
            modal: modalElems,
            tweetElems,
            user,
        }

        fetchData.getPost().then(data => {
            data.forEach(item => {
                this.tweets.addPost(item)
            });
            this.showAllPost();
            this.elements.modal.forEach(this.handlerModal, this);
            this.elements.tweetElems.forEach(this.addTweet, this)
        })
    };
    renderPost(posts) {
            this.elements.listElem.textContent = "";
            posts.forEach(({
                        id,
                        userName,
                        nickname,
                        text,
                        img,
                        likes = 0,
                        getDate
                    }) => {
                        this.elements.listElem.insertAdjacentHTML('afterbegin', `
            <li>
                <article class="tweet">
                    <div class="row">
                        <img class="avatar" src="images/${nickname}.jpg" alt="Аватар пользователя ${userName}">
                        <div class="tweet__wrapper">
                            <header class="tweet__header">
                                <h3 class="tweet-author">${userName}
                                    <span class="tweet-author__add tweet-author__nickname">${nickname}</span>
                                    <time class="tweet-author__add tweet__date">${getDate()}</time>
                                </h3>
                                <button class="tweet__delete-button chest-icon data-id="${id}"></button>
                            </header>
                            <div class="tweet-post">
                                <p class="tweet-post__text">${text}</p>
                                ${img?`<figure class="tweet-post__image">
                                    <img src="${img}" alt="${text}">
                                </figure>`: ""}
                            </div>
                        </div>
                    </div>
                    <footer>
                    <button class="tweet__like">
                                ${likes}
                            </button>
                    </footer>
                </article>
            </li>`)
        })

    }
    showUserPost() {

    }
    showLikesPost() {

    }
    showAllPost() {
        this.renderPost(this.tweets.posts)
    }
    handlerModal({
        button,
        modal,
        overlay,
        close,
    }) {
        const buttonElem = document.querySelector(button);
        const modalElem = document.querySelector(modal);
        const overlayElem = document.querySelector(overlay);
        const closeElem = document.querySelector(close);

        const openModal = (e) => {
            modalElem.style.display = "block";
        }
        const closeModal = (elem,e) => {
            if (e.target===elem) {
                modalElem.style.display = 'none';
            }
        }
        buttonElem.addEventListener('click', openModal);
        closeElem.addEventListener('click', closeModal.bind(null, closeElem));
        overlayElem.addEventListener('click', closeModal.bind(null, overlayElem));
        
        this.handlerModal.closeModal = () => {
            overlayElem.style.display = 'none'
        };

    }
    addTweet({text,
        img,
        submit}) {
        const textElem = document.querySelector(text);
        const imgElem = document.querySelector(img);
        const submitElem = document.querySelector(submit);

        let tempString = textElem.innerHTML;
        let imgUrl='';
        
        submitElem.addEventListener('click', e => {
            this.tweets.addPost({
                userName: this.user.name,
                nickname: this.user.nick,
                text: textElem.innerHTML,
                img: imgUrl,
            });
            this.handlerModal.closeModal();
            this.showAllPost();
            console.log(this.tweets);
            textElem.innerHTML = tempString;
            
        });
        
        textElem.addEventListener('click', () => {
            if (textElem.innerHTML === tempString) {
                textElem.innerHTML = "";
            }
        })
        imgElem.addEventListener('click', () => {
            imgUrl = prompt('Введите вдрес картинки');
        })
    }
}

class Posts {
    constructor({
        posts = []
    } = {}) {
        this.posts = posts;
    }
    addPost(tweet) {
        this.posts.push(new Post(tweet))
        //console.log(this.posts);
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
    constructor({
        id,
        userName,
        nickname,
        postDate,
        text,
        img,
        likes = 0
    }) {
        this.id = id || this.generateID();
        this.userName = userName;
        this.nickname = nickname;
        this.postDate = postDate ? new Date(postDate) : new Date;
        this.text = text;
        this.img = img;
        this.likes = likes;
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

    generateID() {
        return Math.random().toString(32).substring(2, 9) + (+new Date).toString(32)
    }
    getDate = () => {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'

        }
        return this.postDate.toLocaleString('ru-Ru', options)
    }
}

let twitter = new Twitter({
    listElem: '.tweet-list',
    user: {
        name: 'Aleh',
        nick: 'krendil',  
    },
    modalElems: [{
        button: '.header__link_tweet',
        modal: '.modal',
        overlay: '.overlay',
        close: '.modal-close__btn'
    }],
    tweetElems: [{
        text: '.modal .tweet-form__text',
        img: '.modal .tweet-img__btn',
        submit:'.modal .tweet-form__btn',
    }]
})