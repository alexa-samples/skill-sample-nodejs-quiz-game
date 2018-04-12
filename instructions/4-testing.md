# Alexaクイズゲームスキルの作成
[![音声ユーザーインターフェース](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/1-locked.png)](1-voice-user-interface.md)[![Lambda 関数](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/2-locked.png)](2-lambda-function.md)[![VUIとコードを接続する](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/3-locked.png)](3-connect-vui-to-code.md)[![テスト](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/4-on.png)](4-testing.md)[![カスタマイズ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/5-off.png)](5-customization.md)[![スキルの公開](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/6-off.png)](6-publication.md)

## Alexaスキルのテスト

ここまでで、私たちは[音声ユーザーインターフェース](1-voice-user-interface.md)と[Lambda関数](2-lambda-function.md)を作成し、 [それらを接続](3-connect-vui-to-code.md)しました。 これであなたのスキルをテストする準備が整いました。

1.  **[Amazon開発者ポータル](https://developer.amazon.com/edw/home.html#/skills/list)** に戻り、あなたが作ったスキルを一覧から選択します。このチュートリアルを冒頭から始めていれば、ブラウザーのタブに残っていることでしょう。

2.  左側にある**「テスト」**タブを開きます。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/4-2-test-tab.png)

3.  **音声シュミレーターについて** 今回のスキルに限らず、どのスキルにとっても音声シュミレータは便利なテストツールです。テキスト入力フィールドに文字列を入力して「聴く」ボタンをクリックすると、Alexaがそれをどのように発音するか聞くことができます。Alexaの発音を変えるには、**Speech Synthesis Markup Language [(SSML)](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference)** を利用できます。次のいくつかの例を試してみてください。

    ```html
    <say-as interpret-as="number">12345</say-as>
    ```

    ```html
    <say-as interpret-as="ordinal">12345</say-as>
    ```

    ```html
    <say-as interpret-as="digits">12345</say-as>
    ```

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/4-3-voice-simulator.png)

    Alexaが期待通りの発音をするかどうか確認するため、必要に応じて音声シュミレータを利用してください。

4.  **サービスシミュレーター**でスキルをテストします。スキルが期待通りに動作することを確認するには、サービスシミュレーターを使用します。**「発話を入力してください」**のテキスト入力フィールドに「埼玉県について教えて」と入力してください。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/4-4-service-simulator.png)

### サービスシミュレーターのヒント

* **「(スキル名)を呼び出す」** ボタンをクリックすると、上のスクリーンショットにあるように、**サービスリクエスト**と**サービスレスポンス** ボックスにJSONデータが表示されます。
* 右下の **「聴く」** ボタンをクリックすると、レスポンスの内容をAlexaがどのように読み上げるのかを聞くことができます。
* **"The remote endpoint could not be called, or the response it returned was invalid,"** というレスポンスを受け取った場合、何らかの設定が適切でない可能性があります。AWS Lambdaのテストツールも利用して問題を解決してください。

5.  **AWS Lambdaのテストイベントを設定します。** ここまでで、サービスシミュレーターの **サービスリクエスト** と **サービスレスポンス** のボックスについて説明しました。**サービスリクエスト** に表示されたデータを活用すると、Lambda関数を更新した際にすぐに直接テストできるようになります。 以下の手順を行います。

    1.  サービスシミュレーターに発話を入力して、生成されたLambdaへ送信されるリクエストを次のステップのためにコピーします。

    2.  **AWSマネジメントコンソール** でLambda関数を開き、 **「テストイベントの選択..」** メニューから **テストイベントの設定** を選択します。

        ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/4-5-2-configure-test-event.png)

    3.  **「新しいテストイベントの作成」** を選択します。イベントテンプレートのドロップダウンリストから **Alexa Start Session** を選択します。リストにあるのはテンプレート化されたイベントリクエストなので、どれを選んでもよいですが、覚えやすいので「Alexa Start Session」を使用します。

        ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/4-5-3-alexa-start-session.png)

    4.  **テキストボックスの内容を削除し、サービスシミュレーターから取得したリクエストの内容を貼り付けてください。**

     **「イベント名」** ダイアログボックスにイベント名を入力します。 コードエディタの内容を削除し、上記でコピーしたLambdaからのリクエストをコードエディタに貼り付けます。イベント名はあなたにしか見えません。テストイベントには覚えやすい名前を付けます。今回の例では、「startSession」というイベント名を入力しました。 他にもサービスシミュレータからLambdaリクエストをコピーペーストすることで、プリセットされたテンプレート以外にもさまざまな発話やスキルからのイベントをテストすることができます。

      ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/4-5-4-paste-request._TTH_.png)
        

    5.  **「作成」** ボタンをクリックします。これによってテストイベントが保存され、Lambda関数のメイン設定に戻ります。

    6.  **「テスト」** ボタンをクリックして、「startSession」テストイベントを実行します。

        ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/4-5-5-execution-test.png)

        実行結果が表示されたら「詳細」をクリックします。テストによって次の4つのことが確認できます。
         ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/4-5-5-1-execution-result._CB1515662132_.png)

        *  **レスポンス** 「実行結果」内に表示されます。

        *  **実行結果の統計値の概要** ここには実行時間やリソース、使用メモリなどが表示されます。
        *  **ログ出力**  Lambda関数のコード内で console.log() を適切に使うことで、 関数内で何が起こっているかトラッキングできます。何か問題が起きた時に原因を特定する役に立つでしょう。より高度なスキルを作るようになった時、ログの有用性に気づくはずです。

        *  **CloudWatchの[ログ](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:)へのリンク**  ログには全てのレスポンスとエンドユーザーとのやりとりが記録されます。これはとても有用で、特に自分のデバイスでスキルをテストする時に非常に役に立ちます。 (ログ出力の概要については、[こちら](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:)をクリックしてください。)

2.  **その他のテスト方法の検討**

    *  [Echosim.io](https://echosim.io) はブラウザベースのAlexaスキルテストツールです。物理デバイスを持ち運ぶことなくどこでも使えるので、手軽にスキルをテストできます。
    *  [Unit Testing with Alexa(英語)](https://github.com/alexa/alexa-cookbook/tree/master/testing/postman/README.md) は [Postman](http://getpostman.com) と [Amazon API Gateway](http://aws.amazon.com/apigateway) を使用したモダンなユニットテストのアプローチです.

7.  サンプルスキルが正常に動作することを確認できたら、このスキルを**カスタマイズ**しましょう。


[![カスタマイズ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/general/buttons/button_next_customization.png)](5-customization.md)

