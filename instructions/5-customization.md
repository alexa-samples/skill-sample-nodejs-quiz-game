# Alexaクイズゲームスキルの作成
[![音声ユーザーインターフェース](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/1-locked.png)](1-voice-user-interface.md)[![Lambda 関数](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/2-locked.png)](2-lambda-function.md)[![VUIとコードを接続する](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/3-locked.png)](3-connect-vui-to-code.md)[![テスト](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/4-locked.png)](4-testing.md)[![カスタマイズ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/5-on.png)](5-customization.md)[![スキルの公開](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/6-off.png)](6-publication.md)

<!--<a href="1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png" /></a><a href="2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png" /></a><a href="3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png" /></a><a href="4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png" /></a><a href="5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-on._TTH_.png" /></a><a href="6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png" /></a>-->

## スキルのカスタマイズ

ここまでで、都道府県クイズゲームのワーキングコピーができたはずです。これをあなたのオリジナルのスキルにするために、事前に用意しておいたデータと応答文を使ってカスタマイズしましょう。変更すべき点は次の通りです。

1.  **新しいデータ** 日本の47都道府県**以外の**新しいクイズ用のデータセットを作成してください。ネタ探しには、[Wikipedia 一覧の一覧](https://ja.wikipedia.org/wiki/%E4%B8%80%E8%A6%A7%E3%81%AE%E4%B8%80%E8%A6%A7) などが参考になるでしょう。

    1.  **index.jsのコピーを開きます。** まだコードをダウンロードしていない場合は、[GitHubからダウンロードできます。](../lambda/custom/index.js).  [Atom](http://atom.io)、[Sublime Text](http://sublimetext.com)、[VSCode](http://code.visualstudio.com) などのシンプルで軽量なエディタでコードを修正することもできますが、Lambda関数をブラウザ画面上で直接編集することもできます。

    2.  **「TODO: このデータをあなたのものと置き換えてください。」 というコメントを検索してください。** これがスキルのデータ部分です。各行が **PrefectureName** 、 **Romanization** 、 **PrefecturalOfficeLocation** 、 **PrefectureFlower** 、 **PrefectureOrder** という5個の値からなるデータセットであることがわかります。

        スキルでは好きな分量のデータを提供できますが、スキルを面白く保つために最低でも次の3つのことを推奨します (どんなクイズにとっても2つは最少です)。コンテンツに提供されたデータを置き換えることで、クイズには少なくとも25行のデータを提供したほうがよいでしょう。クイズゲームスキルのための適切なデータ構造の他の例として、参照用にいくつかのサンプルデータセットを作成しました。

        *  [ビデオゲーム](../data/videogames.js)
        *  [書籍](../data/books.js)
        *  [都道府県](../data/prefectures.js)
        *  [徳川将軍](../data/monarchs.js)
        
    3.  **ビルトインスロットの値を使うことを検討してください。** Amazonが提供するビルトインスロットの値からデータを抽出することをお勧めします。ビルトインスロットを使ったとしてもデータセット全体を構築する必要がありますが、ビルトインスロットの値を使用することで、次のいくつかのステップの作業が簡単になります。いくつかの例を次に示しますが、[ビルトインスロットの値の一覧はこちら](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#list-types) です。


		| スロットタイプ | 短い説明 | リスト値のサンプル | サポートされる言語 | 利用可能状況 |
		| ----------- | --- | --- | -------------- | ----------- |
		| AMAZON.City | 日本語を話すユーザーが一般的に使用する日本や世界各地の都市の名前を認識します。 このスロットタイプは、拡張して、値を追加することができます。 | </br>ニューヨーク<br/>中央区<br/>日本橋本町</br>東伏見</br>福岡市 | 日本語 | 利用可能 |
		| AMAZON.FirstName | 日本語を話すユーザーが一般的に使用する数千個の名前。このスロットタイプは、拡張して、値を追加することができます。| アオイ（葵）</br>カナ（佳奈）</br>ソウタ（壮太）</br>ハルカ（遥河）</br>ユウト（湧人）|日本語|利用可能|
		|AMAZON.Region|日本語を話すユーザーが一般的に使用する都道府県や郡を認識します。このスロットタイプは、拡張して、値を追加することができます。| 京都府</br>北海道</br>南魚沼郡</br>東京都</br>福岡県 | 日本語 | 利用可能 |

    4.  オリジナルのデータを用意したら、次に進む前に覚えておいたほうがよいヒントをいくつか紹介します。

        *  **Alexaはデータのプロパティ名を読むので、各プロパティ名が質問の中で読まれるようにしてください。** これらの名前はAlexaアプリの **カード** でも使われますので、各単語の最初の文字、または各単語を大文字にする必要があります。スキルは自動的に単語を区切り、必要に応じてスペースを追加します。
        *  **各項目の最初のプロパティは、通常、質問に使用されます。** たとえば、日本の都道府県のデータでは、ほとんどの質問が「神奈川県の県庁所在地は何ですか?」のような形をとります。「県庁所在地 (PrefecturalOfficeLocation)」はプロパティ名からきています。そして、「神奈川県 (PrefectureName)」が最初のプロパティでした（これは、オリジナルのスキルのためにカスタマイズできます）。そうでなければ、順序はまったく重要ではありません。

    5.  **index.jsのデータを置き換えたら、ファイルの内容をLambda関数にコピーします。** テキストをコピーペーストするだけなので、とても簡単です。

2.  **AnswerIntentのための新しい対話モデル。** データを変更した場合、ユーザーから受け取るデータのタイプも変更しなければなりません。

    1.  **開発者ポータルでスキルを開き、「対話モデル」タブに移動します。**

        ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/5-2-1-interaction-model._TTH_.png)

    2.  **インテントスキーマのAnswerIntentのスロット値を更新します。** オリジナルのインテントスキーマでは、データの各プロパティのスロットを定義して、スロットにはデータのプロパティと完全に同じ名前をつけていました。あなたのオリジナルのインテントスキーマでも同じことをする必要があります。

        ### インテントスキーマのヒント

        *  **用意したデータのすべてのプロパティに対応するスロットがあることを確認してください。**  
        *  **できる限りビルトインスロットの値を使用してください。** これが一般的に簡単な方法ですが、カスタムスロットが必要な場合は[簡単に作ることができます](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interaction-model-reference#custom-slot-syntax)。都道府県クイズでは、都道府県のローマ字表記と県の花のために、2個のカスタムスロットを作成しました。
        
    3.  **新しいカスタムスロットが必要な場合は作成します。** データの中でビルトインスロットの値を使用できないすべての値に対して、カスタムスロットが必要です。カスタムスロットは、すべてを使用される値にする必要はありませんが、期待されるデータをできるだけまとめたリストを作ることにはたしかに役立ちます。

    4.  **サンプル発話を更新します。** 作成したデータタイプごとに、AnswerIntentのためのサンプル発話が必要でます。元のデータに代わるオリジナルのデータ構造を表現するために、この発話のリストを更新する必要があります。

        *  **英語以外の言語でこのスキルを作成している場合は、サンプル発話を英語ではなくその言語で記述する必要があることに留意してください。**

    5.  完了したら **「Save Model」** ボタンと **「Build Model」** ボタンを順にクリックします。

3.  **ユーザーへの応答文**
    
    いくつかの文章と応答は、あなたのスキル用にカスタマイズしたほうがよいでしょう。

    1.  **[index.js](../lambda/custom/index.js)** のコピーに戻ります。

    2.  **「TODO: このコメント以下の項目に注意してください。」** というコメント行を探してください。そこがカスタマイズするべきセクションの最初の箇所です。すべてをドキュメント化する代わりに、カスタマイズする部分の目的を理解する助けになるように [index.js](../lambda/custom/index.js) にコメントを残しました。

    3.  **index.js** をファイルの下の方まで読むと、どの部分を変更すべきかおよそ察しがつくでしょう。

4.  **新しい言語を追加**
    
    もし、日本語以外の言語でスキルを提供したい場合は、Alexaの応答がそれらの言語でなされるようにしてください。

    *  たとえば、ドイツ語のスキルを作る場合、Alexaがおこなうすべての応答はドイツ語でおこなわれる必要があります。もしドイツ語のスキルへの応答が日本語でおこなわれた場合、審査を通過することはできないでしょう。

5.  このページに記載した全てのアップデートが終わったら、 **「次へ」** ボタンをクリックして、スキルの公開に進んでください。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/1-6-next-button._TTH_.png)

[![スキルの公開](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/general/buttons/button_next_publication.png)](6-publication.md)

