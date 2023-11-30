const posts = new Map();
let nextId = 0;

/*Recetas creadas inicio*/
addPost({ title: "Crema Zanahoria", rcpImage: "https://megustacomersano.com/wp-content/uploads/2022/01/crema-de-calabaza-con-naranja-y-jengibre-1.jpg"});

export function addPost(post) {
    let id = nextId++;
    post.id = id.toString();
    posts.set(post.id, post);
}

export function getPosts(){
    return [...posts.values()];
}

export function getPost(id){
    return posts.get(id);
}