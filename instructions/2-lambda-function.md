# Alexaクイズゲームスキルの作成
[![音声ユーザーインターフェース](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/1-locked.png)](1-voice-user-interface.md)[![Lambda 関数](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/2-on.png)](2-lambda-function.md)[![VUIとコードを接続する](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/3-off.png)](3-connect-vui-to-code.md)[![テスト](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/4-off.png)](4-testing.md)[![カスタマイズ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/5-off.png)](5-customization.md)[![スキルの公開](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/6-off.png)](6-publication.md)

<!--<a href="1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png" /></a><a href="2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-on._TTH_.png" /></a><a href="3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png" /></a><a href="4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png" /></a><a href="5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png" /></a><a href="6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png" /></a>-->

## Amazon Web Services を使い Lambda 関数を作成する

[このガイドの最初のステップ](1-voice-user-interface.md)で Alexa スキル用の音声ユーザーインターフェース (VUI) を作成しました。このページでは、[Amazon Web Services](http://aws.amazon.com) を使ってAWS Lambda関数を作っていきます。[Lambda 関数の詳細については公式ドキュメントに記載されています](http://aws.amazon.com/lambda) が、今回のスキルを作る上で知っておくべきことは、AWS Lambda はコードが実行される環境であるということです。ユーザーが Alexa に私たちのスキルを起動するよう依頼した時に、適切な応答を返して会話を成立させるのが Lambda 関数です。

1.  **http://aws.amazon.com にサインインしてコンソールを開きます。** まだアカウントを持っていない場合は、アカウントを作成する必要があります。[新規AWSアカウントの作成手順](../set-up-aws.md)を参考にしてください。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-1-sign-in-to-the-console.png")

2.  画面の上にあるメニューバーから **サービス** を選び、検索窓に「Lambda」と入力します。サービス一覧からも選択できます。Lambdaは「コンピューティング」のセクションにあります。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-2-services-lambda.png")

3.  **AWSリージョン** を確認します。Alexa Skills Kitが利用できるLambdaのリージョンは、2017年11月時点ではアジアパシフィック (東京)、米国東部 (バージニア北部)、米国西部 (オレゴン)、EU (アイルランド) の４つです。スキルのエンドユーザーに最も近いリージョンを選択します。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-3-check-region._TTH_.png)

4.  **「関数の作成」** ボタンをクリックします。画面の右上にあります。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-4-create-a-lambda-function._TTH_.png)

5. **設計図**をクリックします。

	![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-4-1-bluebrint._TTH_.png)
   
6. リストされているテンプレートの一覧から **alexa-skill-kit-sdk-factskill** という名前のテンプレートを選択して設定ボタンをクリックします。テンプレートは、スキルに必要なすべての設定を行うショートカットとして用意されています。検索窓を使ってテンプレートを探すことができます。このテンプレートには node.js 用の Alexa Skills Kit SDK のモジュールがあらかじめ含まれているので、別途自分でアップロードする必要はありません。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-5-blueprint._TTH_.png) <!--TODO: THIS IMAGE NEEDS TO BE CUSTOMIZED FOR YOUR SKILL TEMPLATE. -->


7.  **関数を設定します。** 次の画面は、Lambda関数に関する重要な項目を入力したところです。これらの値はあなたにしか見えませんが、関数には意味のある名前をつけるようにしてください。ここでは「quiz-game」と入力するとよいでしょう。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-7-configure-your-function._TTH_.png)

8.  **Lambda関数用のロールを設定します。**  ロールがまだない場合は、[初めてLambda用ロールを作成する場合の手順](../lambda-role.md)を参考に作ってください。この手順に沿って作成したロールが既にある場合は、**既存のロール** の値を「lambda\_basic\_execution」に設定してください。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-9-lambda-function-role._TTH_.png)
    
9.  画面右下の **関数の作成** ボタンをクリックします。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-4-create-a-lambda-function._TTH_.png)
    
10. **トリガーを設定します。** 破線のボックスをクリックして、リストからAlexa Skills Kitを選択します。トリガーのリストにAlexa Skills Kitが表示されない場合は、Alexa Skills Kitをサポートしていないリージョンを選択していない可能性があります。このページの手順3に戻って正しくリージョンをください。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-6-configure-your-trigger._TTH_.png)

    Alexa Skills Kitを選択したら、画面右下の **追加** ボタンをクリックしてください。 
    
    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-6-1-adding-ask-trigger._TTH_.png)

11. **quiz-game**のLambdaアイコンをクリックします。

	![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-11-1-select-lamda._TTH_.png)
     
12.  **Lambda関数コード**のコード編集ボックスに、 [提供されたコード](../lambda/index.js) を**コピー＆ペースト**してください。このソースコードは、[GitHub](../lambda/index.js)にあります。

	![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-12-copy-lambda-code._TTH_.png)

13. 今回はその他の項目は設定する必要はありません。画面右上の **保存** ボタンをクリックしてください。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-10-save-button._TTH_.png)

14. 関数を作成したら、画面の右上にARNの値が表示されます。このガイドの次のセクションで使用するため、この値（**赤枠の部分のみ**）をクリップボードにコピーしておいてください。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/2-12-copy-ARN._TT_.png) 


[![VUIとコードを接続する](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/general/buttons/button_next_connect_vui_to_code.png)](3-connect-vui-to-code.md)
