import React from 'react';


class App extends React.Component {
    constructor(props){
        super(props);
        // Local state
        this.state = {
            currentQuote: "",
            currentAuthor: "",
            authourIndex: 99999
        }
        // class method binding
        this.handleClick = this.handleClick.bind(this);
        this.getQuoteAndAuth = this.getQuoteAndAuth.bind(this);
    };

    // Class methods
    getQuoteAndAuth() {
        const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
        fetch(url) //
        .then(resp => resp.json())
        .then(jsonObj => {

            const index = Math.floor(Math.random() * jsonObj.quotes.length);

            this.setState({     // Storing index in state to reference background image.
                authourIndex: index
            });
            console.log(this.state);
            return jsonObj.quotes[index]
        })
        .then(result => {
            this.setState({
                currentQuote: result.quote,
                currentAuthor: result.author
            });
            console.log(this.state);
        })
    };

    componentDidMount() {
        this.getQuoteAndAuth()
    }

    handleClick(e) {
        this.getQuoteAndAuth();
    };

    // Render
    render() {
        return (
            <div key={Math.random()} id="background" style={{
                    backgroundImage: `url(./images/IMG_${this.state.authourIndex}.jpg)`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundCover: "center center",
                    animation: "fade-in 1.5s"
                }}>
            <div id="quote-box">
                <h1 id="text">{`"${this.state.currentQuote}"`}</h1>

                <h2 id="author">{`-${this.state.currentAuthor}`}</h2>

                <div className="buttons">

                    <a className="button share-quote" id="tweet-quote" href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent('"' + this.state.currentQuote + '" -' + this.state.currentAuthor)}`}>
                        <i className="fa fa-twitter"></i>
                    </a>

                    <a className="button share-quote" id="tumblr-quote" href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(this.state.currentAuthor)}&content=${encodeURIComponent(this.state.currentQuote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}>
                        <i className="fa fa-tumblr"></i>
                    </a>

                    <button className="button" id="new-quote" onClick={this.handleClick}>New Quote</button>

            </div>
            </div>
            </div>
        )
    };
}

// Export
export default App;
