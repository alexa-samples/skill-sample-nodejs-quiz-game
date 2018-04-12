# Alexaクイズゲームスキルの作成
[![音声ユーザーインターフェース](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/1-off._TT_.png)](1-voice-user-interface.md)[![Lambda 関数](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/2-off._TT_.png)](2-lambda-function.md)[![VUIとコードを接続する](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/3-off._TT_.png)](3-connect-vui-to-code.md)[![テスト](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/4-off._TT_.png)](4-testing.md)[![カスタマイズ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/5-off._TT_.png)](5-customization.md)[![スキルの公開](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/6-off._TT_.png)](6-publication.md)


## 習得するもの
*  [AWS Lambda](http://aws.amazon.com/lambda)
*  [Alexa Skills Kit (ASK)](https://developer.amazon.com/alexa-skills-kit)
*  Voice User Interface (VUI) の設計
*  Skill Certification
*  State Management
*  [Speechcons](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference)

## 必要なもの
*  [Amazon Developer Portalのアカウント](http://developer.amazon.com)
*  [Amazon Web Servicesのアカウント](http://aws.amazon.com/)
*  [GitHub](https://github.com/alexa/skill-sample-nodejs-quiz-game)上のサンプルコード
*  シンプルなGUIエディタ
*  スキルのユーザに出題する面白いクイズデータ (すくなくとも25問分)。
   *  例: [ビデオゲーム](../data/videogames.js), [書籍](../data/books.js), [都道府県](../data/prefectures.js), [徳川将軍](../data/monarchs.js)

## クイズゲームスキルがおこなうこと
私たちは皆、頭の中に興味深いデータを持っています。それは、たとえば、子供時代に遊んだアクションフィギュアのリストであったり、日本の都道府県の詳細な情報であったり、贔屓の野球チームの歴史的な名投手のリストであったりすることでしょう。私たちは友人といる時に、こういったカテゴリの情報についてお互いにクイズを出しあうこともあります。それは、私たちの知識を共有し、好きなトピックについてより学ぶための楽しくインタラクティブな方法です。

新しいクイズスキルテンプレートを使用して、Alexaにそのような体験をさせましょう。データとそのプロパティの数を指定すると、Alexaがクイズゲームを動的に作成します。クイズで、Alexaは次のような質問をします。
*  「神奈川県の県の花は何ですか?」
*  「金田正一投手が成し遂げた完封回数は何回ですか?」
*  「『銀河鉄道の夜』が最初に出版されたのは何年ですか?」

データとそのプロパティの数を入力すると、Alexaがクイズゲームを動的に作成します。クイズでは、Alexaは次のような質問をします。
*  「アレクサ、都道府県クイズに三重県について聞いて」
*  「アレクサ、野球クイズに鈴木啓示について聞いて」
*  「アレクサ、ベストセラークイズに『砂の女』について聞いて」

あなたがUSにいるなら、新しい [speechcon](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference) 機能をAlexaスキル開発で使うことができます。Speechconは、 Alexaがより感情を込めて発音する特別な言葉とフレーズです。このクイズゲームスキルでは、クイズの最中に、ユーザの回答が正解だったか不正解だったかを伝える箇所で使います。

実際に動くスキルのサンプルを見たい場合、[Alexa app](http://amazon.com/skills) から [United States Quiz](https://www.amazon.com/Jeff-Blankenburg-United-States-Quiz/dp/B06X9GQBRL) を有効化できます。クイズに最初に挑戦した時にはすべての問題に正解できないかもしれませんが、新しいクイズゲームがどんなふうに素晴らしいかを体感できるはずです!

[![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_get_started._TTH_.png)](1-voice-user-interface.md)
