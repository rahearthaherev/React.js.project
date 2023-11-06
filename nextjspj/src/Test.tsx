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

interface UpdateProps {
    title: string;
    body: string;
    onUpdate: (title: string, body: string) => void;
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

function Update(props: UpdateProps) {
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);
    return <article>
        <h2>Update</h2>
        <form onSubmit={(event: any) => {
            event.preventDefault();
            const title: string = event.target.title.value;
            const body: string = event.target.body.value;
            props.onUpdate(title, body);
        }}>
            <p><input type='text' name='title' value={title} onChange={(event: any) => {
                setTitle(event.target.value);
            }} /></p>
            <p><textarea name='body' value={body} onChange={(event: any) => {
                setBody(event.target.value);
            }} /></p>
            <p><input type='submit' value='Update' /></p>
        </form>
    </article>
}

function App() {
    const [mode, setMode] = useState('WELCOME');
    const [id, setId] = useState<number>(0);
    const [nextid, setNextId] = useState<number>(4)
    const [topics, setTopics] = useState<NavProps[]>([
        { id: 1, title: "html", body: "html is ..." },
        { id: 2, title: "css", body: "css is ..." },
        { id: 3, title: "tsx", body: "txs is ..." }
    ])

    let content: JSX.Element = <></>;
    let contextControl: JSX.Element = <></>;

    if (mode === "WELCOME") {
        content = <Article title="Welcome" body="Hello, Web"></Article>
        contextControl = <li><a href="/create" onClick={(event: any) => {
            event.preventDefault();
            setMode("CREATE");
        }}>Create</a></li>
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
        contextControl = <>
            <li><a href={'/update/' + id} onClick={(event: any) => {
                event.preventDefault();
                setMode("UPDATE");
            }}>Update</a></li>
            <li><input type='button' value='Delete' onClick={() => {
                const newTopics: NavProps[] = [];
                for (let i = 0; i < topics.length; i++) {

                    if (id != topics[i].id) {
                        newTopics.push(topics[i]);
                    }
                }
                setTopics(newTopics);
                setMode("WELCOME");
            }}></input></li>
        </>
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
    } else if (mode === "UPDATE") {
        let title: string = "";
        let body: string = "";
        for (let i = 0; i < topics.length; i++) {

            if (id === topics[i].id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Update title={title} body={body} onUpdate={(title: string, body: string) => {
            const updatedTopic: NavProps = { id: id, title: title, body: body };
            const newTopics: NavProps[] = [...topics];
            for (let i = 0; i < newTopics.length; i++) {
                if (id === newTopics[i].id) {
                    newTopics[i] = updatedTopic;
                    break;
                }
            }
            setTopics(newTopics);
            setMode("READ");
        }}></Update>
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
            <ul>
                {contextControl}
            </ul>
        </div >
    )
}

export default App;