# Alexaクイズゲームスキルの作成
[![音声ユーザーインターフェース](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/1-on._TT_.png)](1-voice-user-interface.md)[![Lambda 関数](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/2-off._TT_.png)](2-lambda-function.md)[![VUIとコードを接続する](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/3-off._TT_.png)](3-connect-vui-to-code.md)[![テスト](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/4-off._TT_.png)](4-testing.md)[![カスタマイズ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/5-off._TT_.png)](5-customization.md)[![スキルの公開](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/6-off._TT_.png)](6-publication.md)

## 開発者ポータルでAlexaスキルの設定をする

Alexaスキルは２つの部分からできています。一つは [音声ユーザーインターフェース (VUI)](https://developer.amazon.com/alexa-skills-kit/vui) です。ここで、ユーザーからの音声入力をどのように処理し、特定の指示が発話された時にどのコードが実行されるかを定義します。もう一つはスキルの実際のコードロジックです。これについては、このステップバイステップガイドの [次のステップ](2-lambda-function.md) で説明します。

1.  **まず、[Amazon開発者ポータル](http://developer.amazon.com)を開き、右上にある「サインイン」ボタンをクリックしてください。** </br>(まだアカウントを持っていない場合、無料で新規アカウントを作成できます。)

     ![サインイン](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/1-1-developer-portal._TT_.png)

2.  **サインイン後、画面の上にある Alexa ボタンをクリックしてください。**

    ![Alexaボタン](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/1-2-alexa-button._TT_.png)

3.  **ALEXA** のページが開いたら、**Alexa Skills Kit** の **始める** ボタンをクリックします。

    ![Get Started](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/1-3-alexa-skills-kit._TT_.png)

4.  **新しいスキルを追加する** ボタンをクリックします。新しいAlexaスキル設定画面の最初のページが開きます。

    ![Amazon開発者ポータル](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/1-4-add-a-new-skill._TT_.png)

5.  **スキル情報** ページに必要な情報を入力してください。 

	入力の際、下記のヒントを参考にしてください。

    ![スキル情報](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/1-5-skill-information._TT_.png)

    ### スキル情報の入力
    *  **スキルの種類** 今回は、「カスタム対話モデル」を利用してスキルを作成します。これは初期設定です。

    *  **言語** サポートする主要な言語を選択してください。後から追加の言語を設定できますが、まずは一つの言語から始めましょう。 (このガイドでは日本語を利用します)

    *  **スキル名** [Alexaアプリ](http://alexa.amazon.co.jp) 内で表示されるスキルの名前です。

    *  **呼び出し名** ユーザーがスキルを起動する時に使う名前です。このサンプルスキルには、「都道府県クイズ」のような名前を使います。開発者が呼び出し名について経験する一般的な課題を次の表に示します。スキルの呼び出し名を検討する際には、[カスタムスキルの呼び出し名を決定する](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/choosing-the-invocation-name-for-an-alexa-skill) も確認してください。

        | 呼び出し名の条件 | 誤った呼び出し名の例 |
        | ---------------------------- | -------------------------------------- |
        | スキルの呼び出し名は知的財産権を侵してはいけない。| 日本航空、トヨタ |
        | 呼び出し名は2つ以上の単語である必要がある(ブランド名や知的財産権のある単語の場合は例外)。人名や場所名は利用できない。 | 占い、 トリビア、 案内、 大阪 |
        | 呼び出し名には Alexaの起動フレーズが含まれてはいけない。起動フレーズの例: 「起動」「実行」「検索」「スタート」「サーチ」| 辞書サーチ、スタートアップ英会話 |
        | 呼び出し名にはウェイクワードつまり「アレクサ」「アマゾン」「エコー」「コンピューター」を含んではいけない。また、「スキル」「アプリ」という単語を含んでもいけない。| ハッカースキル、単語アプリ |
        | 呼び出し名は選択した言語で書かれなければならない。例えば、日本語のスキルの場合、呼び出し名は日本語で書かれなければならない。同様に、ドイツ語スキルの場合はドイツ語で、英語スキルの場合は英語で書かれなければならない。| English Study (日本語のスキル) |

    *  **Audio Player** 今回のクイズゲームスキルではオーディオファイルを利用しないので「No」を選択してください。スキルにオーディオを追加する方法について知りたい場合は、 [Audio Player Guide](https://github.com/alexa/skill-sample-nodejs-audio-player)を参照してください。

6.  **次へ** ボタンをクリックし **対話モデル** のページに移動します。

    ![次へ ボタン](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/1-6-next-button._TTH_.png)

7.  **スキルビルダーを起動する** ボタンをクリックします。スキルビルダーのダッシュボードが開きます。
    
    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/1-7-skill-builder-launch._TTH_.png)

8. スキルビルダーの左上にある **Dashboard** の下の「Code Editor」をクリックします。

9. 表示されたテキストフィールドで、[Interaction Model](../models/ja-JP.json) が提供するコードに既存のコードを置き換えて、「Apply Changes」または「Save Model」をクリックします。

10. **Save Model** ボタンをクリックしてから、 **Build Model** ボタンをクリックします。
 
    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/1-12-skill-builder-build-save-model._TTH_.png)

11.  対話モデルのビルドに成功したら、**Configuration ボタン** を押してコンフィギュレーションに移動します。このガイドの次のステップでは、AWS開発者コンソールからLambda関数を作成します。このブラウザのタブは開いたままにしておいてください。[3ページ: VUIとコードを接続する](3-connect-vui-to-code.md)で再びこの画面に戻ってきます。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/1-13-skill-builder-configuration._TTH_.png)

    対話モデルでエラーが発生するようであれば、次のリストを確認してください。

    *  カスタムスロットの名前は ```JP_ROMANIZATION``` と ```JP_PREFECTURE_FLOWER``` になっていますか？
    *  コードを正しく適切なボックスにコピーアンドペーストしましたか？
    *  対話モデルもしくはサンプル発話に、余計な文字を誤って入力していませんか？ スロット {...} の両側には半角スペースを入れてください。

<br/><br/>
[![Lambda関数](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/general/buttons/button_next_lambda_function._TT_.png)](2-lambda-function.md)

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
