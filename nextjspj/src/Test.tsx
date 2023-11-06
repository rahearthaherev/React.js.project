import React from 'react';
import './App.css';
import { useState } from 'react';
import { Interface } from 'readline';

interface HeaderProps {
    title: string;
    onChangeMode: () => void;
}

interface NavPropsList {
    topics: NavProps[];
    onChangeMode: (_id: number) => void;
}

interface NavProps {
    id: number;
    title: string;
    body: string;
}

interface ArtiProps {
    title: string;
    body: string;
}

interface CreateProps {
    onCreate: (title: string, body: string) => void;
}

function Header(props: HeaderProps) {
    return <header>
        <h1><a href="/" onClick={(event: any) => {
            event.preventDefault();
            props.onChangeMode();
        }}>{props.title}</a></h1>
    </header>
}

function Nav(props: NavPropsList) {
    const lis: NavProps[] = props.topics;

    const renderedLis = lis.map((item) => (
        <li key={item.id}><a id={item.id.toString()} href={"/read/" + item.id} onClick={(event: any) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
        }}>{item.title}</a></li>
    ));
    return <nav>
        <ol>
            {renderedLis}
        </ol>
    </nav>
}

function Article(props: ArtiProps) {
    return <article>
        <h2>{props.title}</h2>
        {props.body}
    </article>
}

function Create(props: CreateProps) {
    return <article>
        <h2>Create</h2>
        <form onSubmit={(event: any) => {
            event.preventDefault();
            const title: string = event.target.title.value;
            const body: string = event.target.body.value;
            props.onCreate(title, body)
        }}>
            <p><input type='text' name='title' placeholder='title' /></p>
            <p><textarea name='body' placeholder='body' /></p>
            <p><input type='submit' value='Create'></input></p>
        </form>
    </article>
}

function App() {
    const [mode, setMode] = useState('WELCOME');
    const [id, setId] = useState<number>();
    const [nextid, setNextId] = useState<number>(4)
    const [topics, setTopics] = useState<NavProps[]>([
        { id: 1, title: "html", body: "html is ..." },
        { id: 2, title: "css", body: "css is ..." },
        { id: 3, title: "tsx", body: "txs is ..." }
    ])

    let content;

    if (mode === "WELCOME") {
        content = <Article title="Welcome" body="Hello, Web"></Article>
    } else if (mode === "READ") {
        let title: string = "";
        let body: string = "";
        for (let i = 0; i < topics.length; i++) {

            if (id === topics[i].id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Article title={title} body={body}></Article>
    } else if (mode === "CREATE") {
        content = <Create onCreate={(title: string, body: string) => {
            const newTopic: NavProps = { id: nextid, title: title, body: body };
            const newTopics: NavProps[] = [...topics];
            newTopics.push(newTopic);
            setTopics(newTopics);
            setMode("READ");
            setId(nextid);
            setNextId(nextid + 1);
        }}></Create >
    }

    return (
        <div>
            <Header title="REACT" onChangeMode={() => {
                setMode("WELCOME");
            }}></Header>
            <Nav topics={topics} onChangeMode={(_id: number) => {
                setMode("READ");
                setId(_id);
            }}></Nav>
            {content}
            <a href="/create" onClick={(event: any) => {
                event.preventDefault();
                setMode("CREATE");
            }}>Create</a>
        </div >
    )
}

export default App;