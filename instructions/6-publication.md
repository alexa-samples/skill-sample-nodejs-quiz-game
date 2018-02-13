# Alexaクイズゲームスキルの作成
[![音声ユーザーインターフェース](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/1-locked.png)](1-voice-user-interface.md)[![Lambda 関数](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/2-locked.png)](2-lambda-function.md)[![VUIとコードを接続する](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/3-locked.png)](3-connect-vui-to-code.md)[![テスト](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/4-locked.png)](4-testing.md)[![カスタマイズ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/5-locked.png)](5-customization.md)[![スキルの公開](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/6-on.png)](6-publication.md)

## スキルの認定と公開

スキルの公開までもう少しです。最後のステップは、[Alexaアプリ](http://alexa.amazon.co.jp)で利用されるメタデータを追加することです。このページで必要な手順を説明します。また、申請時にありがちなミスを避ける方法について、いくつかヒントを提示します。

1.  [Amazon開発者ポータル](https://developer.amazon.com/edw/home.html#/skills/list) で **公開情報** タブを開きます。

	![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/6-1-publishing-information._TTH_.png)

2.  **グローバルフィールド**
    
    この項目は、このスキルがサポートするすべての言語に対して適用されます。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/6-2-global-fields._TTH_.png)
    
    *  **カテゴリー** の選択メニューでは、今回はクイズゲームを作成しているので、「Games, Trivia, and Accessories」を選択します。 **サブカテゴリー** の選択メニューが表示されたら「Knowledge and Trivia」を選びます。

    *  **テスト手順** の項目では、このスキルの概要や特別な機能、使用上注意が必要な機能があればその説明をしてください。ここに書かれた内容は認定チームが参照します。この項目の入力は必須です。

        *  クイズゲームテンプレートを使用しているので、テスト手順の説明欄に次のように書いてください。

           
           「Quiz Game テンプレートを使用して作成しました。」
           
           
           これでテストチームはあなたがどのようなスキルを申請しているか分かるため、審査時間を短縮できます。      

    *  **国と地域** は、スキルの利用を特定の地域に制限したい場合を除いて「すべての国」にします。こうすることで、Amazonはあなたのスキルを世界中で配信できます。他の言語が使用される地域でスキルが利用されるためには、言語設定を追加する必要があることを覚えておいてください。

3.  **スキルの説明**

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/6-3-description.png)

    *  魅力的で簡潔な説明文を入力してください。説明文はユーザにあなたのスキルの魅力を伝えるためのものです。最大限に活用しましょう。これらの説明文は、[Alexaアプリ](http://alexa.amazon.co.jp/spa/index.html#skills)のスキル一覧ページに表示されます。

4.  **サンプルフレーズ** 
    
    ユーザーがスキルに話しかけるときに最も使われそうなフレーズを3つ入力します。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/6-4-example-phrases.png)

    *  **サンプルフレーズ** には、サンプル発話と完全に一致するものにしてください。ここを間違えてしまったことで審査が通らなかったという例がよくあります。サンプルフレーズを書くときに考慮すべき事項を記載しておきます。
    
       | サンプルフレーズを入力する際に考慮すべき事項 |
       | ----------------------------------------- |
       | サンプルフレーズは[ユーザーによるカスタムスキルの呼び出し](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/supported-phrases-to-begin-a-conversation)に書かれているルールに沿っていること。 |
       | サンプルフレーズは対話モデルで定義した **サンプル発話**に基づいたものであること。 |
       | 1番目のサンプルフレーズは**ウェイクワードと呼び出し名**を含んでいること。 |
       | サンプルフレーズは**適切な応答を返す**ものであること。 |

    *  ユーザーがスキルとやりとりするときに最も一般的に使いそうなフレーズを3つ選んでください。どのフレーズも正常に動作し、素晴らしいユーザー体験を提供するようにしてください。

5.  **キーワード**
    
    ユーザーがスキルを探すときに使うであろうキーワードを全て入力してください。この項目は任意です。[Alexaアプリ](http://alexa.amazon.co.jp)での検索ではスキル名や説明文にある単語も検索対象になるため、入力を省略しても問題ありません。スキルを探すときにユーザーに使って欲しい単語がある場合は、それらのキーワードを入力してください。複数のキーワードはカンマで区切ってください。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/6-5-keywords.png)

6.  **画像**
    
    スキルのアイコンは **108x108** ピクセルと **512x512** ピクセルの2通りのサイズを用意する必要があります。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/6-6-icons.png")

    *  自分が権利を持っているものでアイコンを作成してください。商標やコピーライトを侵害しないようにしてください。
    *  アイコンを作成するソフトウェアをお持ちでない場合は、次のような無料ソフトから選ぶとよいでしょう。

       *  [GIMP](https://www.gimp.org/) (Windows/Mac/Linux)
       *  [Paint.NET](http://www.getpaint.net/index.html) (Windows)
       *  [Inkscape](http://inkscape.org) (Windows/Mac/Linux)
       *  [Iconion](http://iconion.com/) (Windows/Mac)

    *  各サイズのブランクのアイコンを様々なフォーマットでご用意しました。よろしければお使いください。

       *  [PSD](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/psd.zip)
       *  [PNG](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/png.zip)
       *  [GIF](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/gif.zip)
       *  [PDF](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/pdf.zip)
       *  [JPG](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/jpg.zip)
       *  [SVG](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/svg.zip)
       *  [PDN](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/pdn.zip) - [Paint.NET](http://www.getpaint.net/index.html)用
       *  [XCF](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/xcf.zip) - [GIMP](https://www.gimp.org/)用

7.  **[開発者ポータル](https://developer.amazon.com/edw/home.html#/skills/list)** のスキルの左のパネルにある **プライバシーとコンプライアンス** タブを開きます。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/6-7-privacy-and-compliance.png)

8.  **グローバルフィールド** にある質問に、次のガイダンスにしたがって答えてください。これらの項目は、このスキルがサポートする全言語で共通して利用されます。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/6-8-global-fields._TTH_.png")
    
    *  **このスキルを使って何かを購入したり、実際にお金を支払うことができますか？** このクイズゲームでは、**いいえ** を選択します。将来、あなたが作るスキルに適したオプションを選択してください。
    
    *  **このスキルはユーザーの個人情報を収集しますか？** これについても今回のクイズゲームでは **いいえ** を選択します。もし、ユーザーの個人情報、たとえば氏名やメールアドレス、電話番号等を収集しているのであれば、この質問に **はい** と答えてください。
        *  この質問に **はい** と答えた場合、プライバシーポリシーへのリンクを提供する必要があります。

    *  **このスキルは13歳以下の子供をターゲットとしたものですか？** このスキルのデータはあなたが用意したデータでカスタマイズされているので、13歳以下の子供を対象にしているかもしれません。カスタマイズする前の状態の都道府県クイズの場合は、特定の年齢層をターゲットとしたものではないので、**いいえ** を選択します。
        * スキルが13歳以下向けかどうかを判断するには、次の要素を考慮してみてください。
            * スキルのテーマ
            * 子供向けのアクティビティや、子供が好みそうな内容が含まれているか
            * スキル内の言葉遣い
            * スキル内で利用されている音楽やその他のオーディオコンテンツ
            * スキルがどのように説明されてマーケティングされるか
            * スキルの想定利用者層

            確信が持てない場合は[FTC's COPPA Guidance and FAQ](https://www.ftc.gov/tips-advice/business-center/guidance/complying-coppa-frequently-asked-questions)を参照してください。

9.  **輸出コンプライアンス** 全ての項目に同意できるか確認してください。同意する場合はボックスにチェックをつけてください。Amazonがスキルを世界中で配信するために、ここでの同意が必要です。

10. **プライバシーポリシーURL** 必須項目ではありません。今回のクイズゲームスキルでは、空白のままで問題ありません。

11. **利用規約URL** 必須項目ではありません。空白のままで問題ありません。

12. ページの下にある **保存** ボタンをクリックします。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/6-12-save-button._TTH_.png)

13. **全てのチェックマークがグリーンになっているはずです。**

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/6-13-all-six-checkmarks._TTH_.png)

14. 認定のための申請の準備ができたら、ページの下の **申請する** ボタンをクリックします。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/6-14-submit-for-certification._TTH_.png)

15. **申請完了です!**  あなたが知っておく必要のあることがもういくつかあります。

    *  **認定には数日かかります。** 正しく審査するために少々お待ちいただく必要があります。ご了承ください。