import type { UnitGrammarModule } from '../../types/curriculum';

export const GRAMMAR_U1_TO_U4: UnitGrammarModule[] = [
  {
    unit: 1,
    title: 'Passive Voice & Giving Opinions',
    subtitleVi: 'Câu bị động (Hiện tại đơn & Quá khứ đơn) và Mẫu câu nêu quan điểm mạnh / thận trọng',
    sections: [
      {
        id: 'u1-sec-passive',
        title: '1. Passive Voice in Present Simple & Past Simple (Câu bị động)',
        explanationVi:
          'Trong hồ sơ doanh nghiệp Điện – Điện tử, câu bị động dùng để nhấn mạnh công ty được thành lập khi nào/bởi ai, trụ sở đặt ở đâu, cơ cấu bộ phận hoặc sản phẩm/dịch vụ được cung cấp.',
        formulas: [
          {
            label: 'Cấu trúc chung (Active -> Passive)',
            pattern: 'S + to be + P2 (+ by + O)',
            example:
              'William Hewlett and David Packard founded HP company in 1939. -> HP company was founded by William Hewlett and David Packard in 1939.',
            translationVi:
              'William Hewlett và David Packard đã thành lập công ty HP vào năm 1939. -> Công ty HP được thành lập bởi William Hewlett và David Packard vào năm 1939.'
          },
          {
            label: 'Present Simple (Hiện tại đơn)',
            pattern: '(+) S + am/is/are + P2  |  (-) S + am not/isn\'t/aren\'t + P2  |  (?) (Wh-) + am/is/are + S + P2?',
            example: 'Acer is headquartered in New Taipei, Taiwan, and over 7,000 people are employed worldwide.',
            translationVi: 'Acer đặt trụ sở chính tại Tân Bắc, Đài Loan và hơn 7.000 nhân viên được tuyển dụng trên toàn cầu.'
          },
          {
            label: 'Past Simple (Quá khứ đơn)',
            pattern: '(+) S + was/were + P2  |  (-) S + wasn\'t/weren\'t + P2  |  (?) (Wh-) + was/were + S + P2?',
            example: 'Canon was originally established in 1930 to create high-quality cameras.',
            translationVi: 'Canon ban đầu được thành lập vào năm 1930 nhằm chế tạo các máy ảnh chất lượng cao.'
          }
        ],
        notes: [
          'Trật tự trong câu bị động: "by + O" đứng SAU trạng từ chỉ nơi chốn và đứng TRƯỚC trạng từ chỉ thời gian (ví dụ: ...was founded in Palo Alto by Hewlett and Packard in 1939).',
          'Có thể lược bỏ tác nhân không xác định như "by people", "by someone", "by me/us/them/him/her".',
          'Phân biệt chủ động & bị động trong hồ sơ công ty: các động từ "specialize in", "operate in", "include", "offer", "enhance" thường chia CHỦ ĐỘNG khi chủ ngữ là công ty; còn "be founded", "be established", "be headquartered", "be organized into", "be employed" chia BỊ ĐỘNG.'
        ]
      },
      {
        id: 'u1-sec-strong-opinions',
        title: '2. Expressing Strong Opinions (Nêu quan điểm chắc chắn)',
        explanationVi:
          'Sử dụng khi bạn tin tưởng hoàn toàn vào nhận định của mình về vị thế thị trường, sản phẩm hoặc văn hóa của một doanh nghiệp.',
        formulas: [
          {
            label: 'Chắc chắn tuyệt đối',
            pattern: 'I\'m sure / certain that + S + V',
            example: 'I\'m certain that IBM is a well-established company with a lot of respect.',
            translationVi: 'Tôi chắc chắn rằng IBM là một công ty lâu đời nhận được nhiều sự tôn trọng.'
          },
          {
            label: 'Tin tưởng mạnh mẽ',
            pattern: 'I strongly believe that + S + V',
            example:
              'I strongly believe that in the next five years, Panasonic will become the world\'s largest television manufacturer.',
            translationVi:
              'Tôi tin tưởng mạnh mẽ rằng trong năm năm tới, Panasonic sẽ trở thành nhà sản xuất tivi lớn nhất thế giới.'
          },
          {
            label: 'Hiển nhiên / Không nghi ngờ',
            pattern: 'It\'s obvious to me that + S + V  |  I have no doubt that + S + V',
            example: 'It\'s obvious to me that Google is a successful company with a great corporate culture.',
            translationVi: 'Với tôi, rõ ràng Google là một công ty thành công với văn hóa doanh nghiệp tuyệt vời.'
          }
        ],
        notes: [
          'Dùng "certain" (tính từ) sau "I\'m", không dùng "I\'m consider that...".',
          'Dùng "I have no doubt that..." (không nghi ngờ gì), tránh nhầm sang "I have no idea that...".'
        ]
      },
      {
        id: 'u1-sec-cautious-opinions',
        title: '3. Expressing Cautious Opinions (Nêu quan điểm thận trọng)',
        explanationVi:
          'Sử dụng khi bạn muốn đưa ra đánh giá khách quan, lịch sự hoặc khi chưa chắc chắn 100% về nhận định trong phỏng vấn và thảo luận.',
        formulas: [
          {
            label: 'Suy nghĩ / Cho rằng',
            pattern: 'I think / suppose / consider that + S + V',
            example: 'I think that Xiaomi has gained significant market share through smart home devices.',
            translationVi: 'Tôi nghĩ rằng Xiaomi đã giành được thị phần đáng kể nhờ các thiết bị nhà thông minh.'
          },
          {
            label: 'Theo quan điểm / góc nhìn của tôi',
            pattern: 'In my opinion, S + V  |  From my viewpoint, S + V  |  According to me, S + V',
            example:
              'From my viewpoint, the major competitors of Fujitsu are NEC Corporation, Hitachi, Toshiba, and Mitsubishi.',
            translationVi:
              'Theo góc nhìn của tôi, các đối thủ cạnh tranh lớn của Fujitsu gồm NEC Corporation, Hitachi, Toshiba và Mitsubishi.'
          },
          {
            label: 'Theo như tôi biết / Có vẻ như',
            pattern: 'As far as I know / I\'m concerned, S + V  |  It seems to me that + S + V',
            example: 'As far as I\'m concerned, Nikon is the biggest competitor of Canon in imaging solutions.',
            translationVi: 'Theo như tôi được biết, Nikon là đối thủ lớn nhất của Canon trong các giải pháp hình ảnh.'
          }
        ],
        notes: [
          'Chú ý đúng cặp kết hợp từ: "In my opinion" (không nói "In my viewpoint") và "From my viewpoint" (không nói "From my opinion").',
          'Cụm đúng là "As far as I know" hoặc "As far as I\'m concerned" (không viết "As far as I\'m know").',
          'Mẫu "It seems to me that..." phải có "to me" đi kèm động từ "seems".'
        ]
      }
    ],
    questions: [
      {
        id: 'u1-q1',
        unit: 1,
        type: 'mcq',
        prompt:
          'In 1976, Acer ______ by Stan Shih, his wife Carolyn Yeh, and a group of five others as Multitech.',
        promptVi: 'Chọn dạng động từ đúng (chủ động hoặc bị động) theo ngữ cảnh thành lập công ty.',
        options: ['was founded', 'founded', 'is founded', 'was founding'],
        acceptedAnswers: ['was founded'],
        displayAnswer: 'was founded',
        explanationVi:
          'Chủ ngữ "Acer" chịu tác động "được thành lập" vào mốc thời gian quá khứ xác định "In 1976", nên phải dùng bị động quá khứ đơn: was founded.'
      },
      {
        id: 'u1-q2',
        unit: 1,
        type: 'fill',
        prompt: 'Toshiba ______ (headquarter) in Minato, Tokyo and employs 198,741 employees.',
        promptVi: 'Chia động từ trong ngoặc ở thì hiện tại đơn (lưu ý dạng chủ động hay bị động).',
        acceptedAnswers: ['is headquartered'],
        displayAnswer: 'is headquartered',
        explanationVi:
          'Trong hồ sơ công ty, cấu trúc chỉ vị trí đặt trụ sở chính luôn dùng bị động hiện tại đơn: S + is headquartered in + địa điểm.'
      },
      {
        id: 'u1-q3',
        unit: 1,
        type: 'mcq',
        prompt: 'Intel Corporation ______ in processors, semiconductor chips, and integrated circuits.',
        promptVi: 'Chọn động từ đúng để mô tả lĩnh vực chuyên môn của doanh nghiệp.',
        options: ['specializes', 'is specialized', 'was specialized', 'specializing'],
        acceptedAnswers: ['specializes'],
        displayAnswer: 'specializes',
        explanationVi:
          'Động từ "specialize in" (chuyên về lĩnh vực gì) luôn chia ở dạng chủ động khi chủ ngữ là tên doanh nghiệp, ở đây chia số ít hiện tại đơn: specializes.'
      },
      {
        id: 'u1-q4',
        unit: 1,
        type: 'fill',
        prompt:
          'Fujitsu ______ (found) in 1935 and initially, it was called "Fuji Telecommunications Equipment Manufacturing".',
        promptVi: 'Chia động từ "found" sao cho phù hợp với mốc năm 1935.',
        acceptedAnswers: ['was founded'],
        displayAnswer: 'was founded',
        explanationVi:
          'Do có mốc thời gian quá khứ "in 1935" và chủ ngữ "Fujitsu" mang nghĩa bị động ("được thành lập"), ta chia: was founded.'
      },
      {
        id: 'u1-q5',
        unit: 1,
        type: 'mcq',
        prompt:
          "As far as I'm ______, Intel's recent innovation is wearable smart earbuds that provide fitness information.",
        promptVi: 'Chọn từ hoàn chỉnh mẫu câu nêu quan điểm thận trọng chuẩn giáo trình Unit 1.',
        options: ['concerned', 'know', 'certain', 'opinion'],
        acceptedAnswers: ['concerned'],
        displayAnswer: 'concerned',
        explanationVi:
          'Cụm cố định trong giáo trình là "As far as I\'m concerned," (theo tôi được biết/xét theo quan điểm của tôi). Sau "I\'m" không thể dùng động từ nguyên thể "know".'
      },
      {
        id: 'u1-q6',
        unit: 1,
        type: 'mcq',
        prompt:
          'I have no ______ that Apple not only creates devices but also inspires how creatively someone can use them.',
        promptVi: 'Chọn danh từ đúng hoàn thành mẫu câu nêu quan điểm chắc chắn.',
        options: ['doubt', 'idea', 'viewpoint', 'opinion'],
        acceptedAnswers: ['doubt'],
        displayAnswer: 'doubt',
        explanationVi:
          'Mẫu câu nêu quan điểm chắc chắn là "I have no doubt that..." (Tôi không hề nghi ngờ rằng...).'
      },
      {
        id: 'u1-q7',
        unit: 1,
        type: 'rewrite',
        prompt: 'Rewrite in the passive voice: "William Hewlett and David Packard founded HP company in 1939."',
        promptVi: 'Chuyển câu sang bị động quá khứ đơn, đặt "by + O" trước trạng từ chỉ thời gian.',
        acceptedAnswers: [
          'HP company was founded by William Hewlett and David Packard in 1939.',
          'HP company was founded by William Hewlett and David Packard in 1939',
          'HP company was founded in 1939 by William Hewlett and David Packard.',
          'HP company was founded in 1939 by William Hewlett and David Packard',
          'HP was founded by William Hewlett and David Packard in 1939.',
          'HP was founded by William Hewlett and David Packard in 1939'
        ],
        displayAnswer: 'HP company was founded by William Hewlett and David Packard in 1939.',
        explanationVi:
          'Tân ngữ "HP company" chuyển lên làm chủ ngữ; động từ "founded" thành "was founded"; theo quy tắc Unit 1, "by William Hewlett and David Packard" đứng trước trạng ngữ thời gian "in 1939".'
      },
      {
        id: 'u1-q8',
        unit: 1,
        type: 'rewrite',
        prompt: 'Rewrite in the passive voice: "Hitachi offers advanced home appliances and industrial systems."',
        promptVi: 'Viết lại câu sang dạng bị động thì hiện tại đơn.',
        acceptedAnswers: [
          'Advanced home appliances and industrial systems are offered by Hitachi.',
          'Advanced home appliances and industrial systems are offered by Hitachi'
        ],
        displayAnswer: 'Advanced home appliances and industrial systems are offered by Hitachi.',
        explanationVi:
          'Chủ ngữ mới "Advanced home appliances and industrial systems" ở dạng số nhiều nên động từ hiện tại đơn "offers" chuyển thành "are offered", theo sau bởi "by Hitachi".'
      }
    ]
  },
  {
    unit: 2,
    title: 'Reduced Relative Clauses & Making Comparisons',
    subtitleVi: 'Mệnh đề quan hệ rút gọn (V-ing / P2) và Cấu trúc so sánh tương đồng & khác biệt',
    sections: [
      {
        id: 'u2-sec-reduced-relative',
        title: '1. Reduced Relative Clauses (Mệnh đề quan hệ rút gọn)',
        explanationVi:
          'Trong mệnh đề quan hệ xác định (defining relative clauses), ta có thể lược bỏ đại từ quan hệ (who, which, that) cùng động từ to be (nếu có) và rút gọn động từ chính về dạng phân từ.',
        formulas: [
          {
            label: 'Past Participle (Nghĩa bị động)',
            pattern: 'N + (which/that + be) + P2  ->  N + P2',
            example: 'They are talking about the smartwatch introduced by Google.',
            translationVi: 'Họ đang nói về chiếc đồng hồ thông minh (cái mà được) giới thiệu bởi Google.'
          },
          {
            label: 'Present Participle (Nghĩa chủ động)',
            pattern: 'N + (who/which/that) + V  ->  N + V-ing',
            example:
              'Samsung Galaxy S7 is a smartphone which runs Android OS. -> Samsung Galaxy S7 is a smartphone running Android OS.',
            translationVi: 'Samsung Galaxy S7 là một điện thoại thông minh chạy hệ điều hành Android.'
          }
        ],
        notes: [
          'Dùng quá khứ phân từ (P2) khi danh từ đứng trước là đối tượng CHỊU TÁC ĐỘNG (ví dụ: designed by Amazon, equipped with sensors).',
          'Dùng hiện tại phân từ (V-ing) khi danh từ đứng trước TỰ THỰC HIỆN hành động (ví dụ: running Android OS, marketing new smart products), kể cả khi câu gốc ở thì hiện tại đơn.'
        ]
      },
      {
        id: 'u2-sec-comparison-similarity',
        title: '2. Making Comparisons: Similarity (So sánh sự tương đồng)',
        explanationVi:
          'Dùng để đối chiếu các điểm giống nhau về kích thước màn hình, bộ xử lý, tính năng hoặc tiêu chuẩn chống nước giữa hai thiết bị thông minh.',
        formulas: [
          {
            label: 'Tính từ & Giới từ',
            pattern: 'S1 + be + similar to + S2  |  S1 + V + like + N',
            example: 'Apple Watch Series 1 runs a dual-core processor like the Series 2.',
            translationVi: 'Apple Watch Series 1 chạy bộ xử lý lõi kép giống như dòng Series 2.'
          },
          {
            label: 'So sánh ngang bằng',
            pattern: 'as + adj + as  |  the same + N + as',
            example: 'The LG OLED B6P smart TV has the same design as the E7P model.',
            translationVi: 'Tivi thông minh LG OLED B6P có thiết kế giống hệt mẫu E7P.'
          },
          {
            label: 'Liên từ & Trạng từ nối tương đồng',
            pattern: 'Both A and B + V(số nhiều)  |  Similarly, S + V.  |  Likewise, S + V.',
            example: 'Both Samsung Gear 2 and LG G-Watch are certified IP67 for dust and water resistance.',
            translationVi: 'Cả Samsung Gear 2 và LG G-Watch đều đạt chứng nhận IP67 về khả năng kháng bụi và chống nước.'
          }
        ],
        notes: [
          'Chú ý giới từ đi kèm: "similar TO", "the same + danh từ + AS", và "like + danh từ".',
          'Chủ ngữ ghép "Both A and B" luôn chia động từ ở số nhiều (are, feature, have).'
        ]
      },
      {
        id: 'u2-sec-comparison-difference',
        title: '3. Making Comparisons: Difference (So sánh sự khác biệt)',
        explanationVi:
          'Dùng để chỉ ra điểm cải tiến của phiên bản mới so với sản phẩm tiền nhiệm (predecessor) hoặc so sánh ưu nhược điểm giữa hai thiết bị cạnh tranh.',
        formulas: [
          {
            label: 'Tính từ & Giới từ khác biệt',
            pattern: 'S1 + be + different from + S2  |  Unlike + N, S + V',
            example: 'Unlike the predecessors, iPhone 7 is equipped with a dual camera.',
            translationVi: 'Không giống như các mẫu tiền nhiệm, iPhone 7 được trang bị camera kép.'
          },
          {
            label: 'So sánh không ngang bằng & hơn kém',
            pattern: 'not as + adj + as  |  adj-er / more + adj + than',
            example: 'The Exynos dual-core processor is not as fast as the Snapdragon quad-core.',
            translationVi: 'Bộ xử lý lõi kép Exynos không nhanh bằng bộ xử lý lõi tứ Snapdragon.'
          },
          {
            label: 'Trạng từ liên kết đối lập',
            pattern: 'In contrast, S + V',
            example:
              'Sony Watch 2 is built with two separate apps. In contrast, these apps are combined into one on newer devices.',
            translationVi:
              'Sony Watch 2 được tích hợp hai ứng dụng riêng biệt. Trái lại, các ứng dụng này được gộp làm một trên các mẫu mới hơn.'
          }
        ],
        notes: [
          'Tính từ "different" luôn đi với giới từ "from" (không dùng "different with").',
          'Tính từ ngắn (thin -> thinner, light -> lighter, heavy -> heavier) thêm "-er + than"; tính từ dài (expensive, compatible) dùng "more + adj + than".'
        ]
      }
    ],
    questions: [
      {
        id: 'u2-q1',
        unit: 2,
        type: 'mcq',
        prompt: 'The smart speaker ______ by Amazon is called Amazon Echo.',
        promptVi: 'Chọn phân từ đúng để rút gọn mệnh đề quan hệ.',
        options: ['designed', 'designing', 'designs', 'was designed'],
        acceptedAnswers: ['designed'],
        displayAnswer: 'designed',
        explanationVi:
          'Danh từ "The smart speaker" mang nghĩa bị động ("chiếc loa được Amazon thiết kế"), nên mệnh đề quan hệ "which is designed by Amazon" rút gọn thành quá khứ phân từ "designed".'
      },
      {
        id: 'u2-q2',
        unit: 2,
        type: 'mcq',
        prompt: 'The LG Watch Sport is a high-end device ______ the Android Wear 2.0 operating system.',
        promptVi: 'Chọn dạng động từ đúng cho mệnh đề quan hệ rút gọn nghĩa chủ động.',
        options: ['running', 'run', 'ran', 'is running'],
        acceptedAnswers: ['running'],
        displayAnswer: 'running',
        explanationVi:
          'Thiết bị chủ động chạy hệ điều hành ("which runs the Android Wear 2.0 operating system"), nên rút gọn thành hiện tại phân từ chủ động: running.'
      },
      {
        id: 'u2-q3',
        unit: 2,
        type: 'fill',
        prompt: "The Gear 2's battery is very different ______ the battery used in LG G Watch.",
        promptVi: 'Điền giới từ phù hợp hoàn thành cấu trúc so sánh khác biệt.',
        acceptedAnswers: ['from'],
        displayAnswer: 'from',
        explanationVi: 'Cấu trúc cố định trong Unit 2 là "be different from" (khác với).'
      },
      {
        id: 'u2-q4',
        unit: 2,
        type: 'mcq',
        prompt: '______ its predecessors, the iPhone 7 is equipped with a dual camera and water resistance.',
        promptVi: 'Chọn từ đúng đứng trước cụm danh từ "its predecessors" để diễn đạt sự khác biệt.',
        options: ['Unlike', 'Similarly', 'In contrast', 'Different'],
        acceptedAnswers: ['Unlike'],
        displayAnswer: 'Unlike',
        explanationVi:
          'Giới từ "Unlike + cụm danh từ" (Không giống như...) được đặt đầu câu để đối chiếu; còn "Similarly" và "In contrast" là trạng từ liên kết đi trực tiếp với một mệnh đề.'
      },
      {
        id: 'u2-q5',
        unit: 2,
        type: 'fill',
        prompt: 'The Fonarama ePhone weighs 94 g, so it is ______ (light) than the Classic ePhone (135 g).',
        promptVi: 'Điền dạng so sánh hơn của tính từ trong ngoặc.',
        acceptedAnswers: ['lighter'],
        displayAnswer: 'lighter',
        explanationVi: 'Tính từ ngắn "light" chuyển sang dạng so sánh hơn là "lighter" đi trước "than".'
      },
      {
        id: 'u2-q6',
        unit: 2,
        type: 'mcq',
        prompt:
          'Sony Watch 2 uses two separate fitness apps. ______, newer models combine them into one unified app.',
        promptVi: 'Chọn liên từ nối hai câu có nội dung tương phản nhau.',
        options: ['In contrast', 'Similarly', 'Likewise', 'Both'],
        acceptedAnswers: ['In contrast'],
        displayAnswer: 'In contrast',
        explanationVi:
          'Hai câu nêu hai thiết kế trái ngược nhau (hai ứng dụng riêng biệt vs gộp thành một ứng dụng), nên dùng liên từ đối lập "In contrast,".'
      },
      {
        id: 'u2-q7',
        unit: 2,
        type: 'rewrite',
        prompt: 'Rewrite using a reduced relative clause: "Samsung Galaxy S7 is a smartphone which runs Android OS."',
        promptVi: 'Rút gọn mệnh đề quan hệ xác định trong câu sau.',
        acceptedAnswers: [
          'Samsung Galaxy S7 is a smartphone running Android OS.',
          'Samsung Galaxy S7 is a smartphone running Android OS'
        ],
        displayAnswer: 'Samsung Galaxy S7 is a smartphone running Android OS.',
        explanationVi:
          'Lược bỏ đại từ quan hệ "which" và chuyển động từ chủ động "runs" về dạng V-ing "running".'
      },
      {
        id: 'u2-q8',
        unit: 2,
        type: 'rewrite',
        prompt:
          'Rewrite using "not as ... as" without changing meaning: "The Snapdragon quad-core processor is faster than the Exynos dual-core processor."',
        promptVi: 'Viết lại câu bắt đầu bằng "The Exynos dual-core processor..." dùng cấu trúc "not as ... as".',
        acceptedAnswers: [
          'The Exynos dual-core processor is not as fast as the Snapdragon quad-core processor.',
          'The Exynos dual-core processor is not as fast as the Snapdragon quad-core processor',
          "The Exynos dual-core processor isn't as fast as the Snapdragon quad-core processor.",
          "The Exynos dual-core processor isn't as fast as the Snapdragon quad-core processor",
          'The Exynos dual-core processor is not so fast as the Snapdragon quad-core processor.',
          'The Exynos dual-core processor is not so fast as the Snapdragon quad-core processor',
          'The Exynos dual-core processor is not as fast as the Snapdragon quad-core.',
          'The Exynos dual-core processor is not as fast as the Snapdragon quad-core'
        ],
        displayAnswer: 'The Exynos dual-core processor is not as fast as the Snapdragon quad-core processor.',
        explanationVi:
          'Đảo ngược hai đối tượng và chuyển so sánh hơn "faster than" thành so sánh không ngang bằng "not as fast as".'
      }
    ]
  },
  {
    unit: 3,
    title: 'Imperatives & Modal Verbs in Installation',
    subtitleVi: 'Câu mệnh lệnh (ngắn / dài) và Động từ khuyết thiếu trong quy trình lắp đặt & an toàn điện',
    sections: [
      {
        id: 'u3-sec-imperatives',
        title: '1. Imperatives: Short & Long Forms (Câu mệnh lệnh)',
        explanationVi:
          'Câu mệnh lệnh dùng để đưa ra chỉ dẫn thao tác lắp đặt trực tiếp, yêu cầu kỹ thuật hoặc cảnh báo an toàn điện. Động từ luôn chia ở dạng nguyên thể không "to".',
        formulas: [
          {
            label: 'Short form (Mệnh lệnh ngắn)',
            pattern: 'V(infinitive)!',
            example: 'Stop! / Go! / Hurry!',
            translationVi: 'Dừng lại! / Đi tiếp! / Nhanh lên!'
          },
          {
            label: 'Long form (Mệnh lệnh dài: Khẳng định & Phủ định)',
            pattern: '(Don\'t) + V(infinitive) + O',
            example:
              'Cut off the electricity to avoid electric shock. / Don\'t attach a cord to another surface with nails or staples.',
            translationVi:
              'Ngắt nguồn điện để tránh bị điện giật. / Không gắn dây điện vào bề mặt khác bằng đinh hoặc ghim bấm.'
          },
          {
            label: 'Với Tính từ / Phân từ',
            pattern: '(Don\'t) + be + Adjective / V.Participle',
            example: 'Don\'t be rushed when fixing the light. Be slow and careful!',
            translationVi: 'Đừng vội vàng khi sửa đèn. Hãy làm chậm rãi và cẩn thận!'
          }
        ],
        notes: [
          'Sau "Don\'t" bắt buộc dùng V(nguyên thể), tuyệt đối không dùng V-ing (sai: "Don\'t exposing...").',
          'Nếu vị ngữ là tính từ hoặc phân từ (careful, rushed), phải thêm động từ "be" ngay sau "Don\'t" hoặc ở đầu câu.'
        ]
      },
      {
        id: 'u3-sec-modals-obligation',
        title: '2. Modal Verbs: Ability, Permission & Obligation (Khả năng, Cho phép & Nghĩa vụ)',
        explanationVi:
          'Giúp kỹ thuật viên diễn đạt khả năng thao tác, yêu cầu mượn dụng cụ hoặc quy định bắt buộc / không cần thiết trong khi lắp đặt.',
        formulas: [
          {
            label: 'can / could (Khả năng, xin phép & điều không thể)',
            pattern: 'S + can/could/can\'t + V(infinitive)',
            example:
              'Can I borrow your tool kit? / We can\'t use this screwdriver for this screw. / I could design a circuit at university.',
            translationVi:
              'Tôi có thể mượn bộ dụng cụ của bạn không? / Chúng ta không thể dùng tua-vít này cho con ốc này. / Tôi từng biết thiết kế mạch hồi đại học.'
          },
          {
            label: 'have to / don\'t have to (Bắt buộc vs Không cần thiết)',
            pattern: 'S + have/has to + V  |  S + don\'t/doesn\'t have to + V  (Quá khứ: had to / didn\'t have to)',
            example: 'I have to clean the equipment after using it. / I didn\'t have to fix the lamp yesterday.',
            translationVi: 'Tôi phải vệ sinh thiết bị sau khi sử dụng. / Hôm qua tôi không cần phải sửa chiếc đèn.'
          }
        ],
        notes: [
          'Phân biệt "mustn\'t" (bị cấm — tuyệt đối không được làm) và "don\'t have to" (không cần thiết — có thể làm hoặc không).',
          'Các modal verbs (can, could, may, might, must, should) đi trực tiếp với V(nguyên thể) không "to"; riêng "have to" và "ought to" có sẵn "to".'
        ]
      },
      {
        id: 'u3-sec-modals-advice',
        title: '3. Modal Verbs: Advice, Certainty & Passive Instructions (Lời khuyên & Mức độ chắc chắn)',
        explanationVi:
          'Diễn đạt lời khuyên kỹ thuật và mức độ chắc chắn ở hiện tại hoặc suy đoán quá khứ, cũng như thể bị động trong hướng dẫn lắp đặt.',
        formulas: [
          {
            label: 'ought to / should (Lời khuyên & ~80% chắc chắn)',
            pattern: 'S + ought to / should + V  (Quá khứ: ought to / should + have + P2)',
            example: 'I ought to set up the circuit tonight. / She ought to have set up the circuit last night.',
            translationVi: 'Tôi nên lắp mạch điện tối nay. / Lẽ ra cô ấy nên lắp mạch điện tối qua.'
          },
          {
            label: 'may / might (< 50% chắc chắn) vs must (~95% chắc chắn)',
            pattern: 'S + may/might/must + V  (Quá khứ: modal + have + P2)',
            example: 'He may be at the lab. / Mary isn\'t at the lab. She must be sick.',
            translationVi: 'Anh ấy có thể đang ở phòng thí nghiệm. / Mary không ở phòng thí nghiệm; chắc hẳn cô ấy bị ốm rồi.'
          },
          {
            label: 'Thể bị động với Modal Verbs trong quy trình lắp đặt',
            pattern: 'S + should / must / ought to + be + P2',
            example: 'The bushing central cavity should be swabbed to remove particulate contaminants.',
            translationVi: 'Khoang trung tâm của ống lót nên được lau sạch để loại bỏ tạp chất dạng hạt.'
          }
        ],
        notes: [
          'Trong câu hướng dẫn lắp đặt bị động (chủ ngữ là linh kiện như "lead connector", "lights", "bushing"), luôn nhớ có "be" giữa modal verb và P2: "should be placed", "should be installed".'
        ]
      }
    ],
    questions: [
      {
        id: 'u3-q1',
        unit: 3,
        type: 'mcq',
        prompt: '______ the electricity before inspecting the junction box to avoid electric shock.',
        promptVi: 'Chọn dạng động từ đúng cho câu mệnh lệnh hướng dẫn an toàn điện.',
        options: ['Cut off', 'Cutting off', 'To cut off', 'Cuts off'],
        acceptedAnswers: ['Cut off'],
        displayAnswer: 'Cut off',
        explanationVi:
          'Câu mệnh lệnh khẳng định bắt đầu bằng động từ nguyên thể không "to": Cut off + O (Ngắt nguồn điện).'
      },
      {
        id: 'u3-q2',
        unit: 3,
        type: 'mcq',
        prompt:
          "Don't ______ a cord to another surface with nails or staples — they can damage the insulation.",
        promptVi: 'Chọn dạng đúng của động từ sau "Don\'t" trong câu mệnh lệnh phủ định.',
        options: ['attach', 'attaching', 'attached', 'to attach'],
        acceptedAnswers: ['attach'],
        displayAnswer: 'attach',
        explanationVi:
          'Theo công thức câu mệnh lệnh phủ định "Don\'t + V(nguyên thể) + O", động từ đi sau "Don\'t" giữ nguyên thể là "attach".'
      },
      {
        id: 'u3-q3',
        unit: 3,
        type: 'fill',
        prompt: "Don't ______ (be) rushed when fixing the light. Be slow and careful!",
        promptVi: 'Điền dạng đúng của động từ trong ngoặc vào câu mệnh lệnh phủ định.',
        acceptedAnswers: ['be'],
        displayAnswer: 'be',
        explanationVi:
          'Công thức câu mệnh lệnh với tính từ/phân từ là "(Don\'t) + be + Adj/P2", nên điền động từ nguyên thể "be".'
      },
      {
        id: 'u3-q4',
        unit: 3,
        type: 'mcq',
        prompt: 'Before installing, determine how many lights you will need and where they should ______.',
        promptVi: 'Chọn dạng bị động đúng đi sau động từ khuyết thiếu "should".',
        options: ['be installed', 'install', 'installing', 'be install'],
        acceptedAnswers: ['be installed'],
        displayAnswer: 'be installed',
        explanationVi:
          'Chủ ngữ "they" (các bóng đèn) cần ở thể bị động ("được lắp đặt"), nên sau modal verb "should" phải dùng "be + P2": be installed.'
      },
      {
        id: 'u3-q5',
        unit: 3,
        type: 'mcq',
        prompt: 'The bushing central cavity ______ swabbed to remove particulate contaminants.',
        promptVi: 'Chọn cụm động từ khuyết thiếu bị động đúng ngữ pháp.',
        options: ['should be', 'should', 'ought', 'have to'],
        acceptedAnswers: ['should be'],
        displayAnswer: 'should be',
        explanationVi:
          'Phía sau chỗ trống là quá khứ phân từ "swabbed" (được lau sạch), nên phải có trợ động từ "be" đi sau "should": should be swabbed.'
      },
      {
        id: 'u3-q6',
        unit: 3,
        type: 'fill',
        prompt:
          'The power supply is already switched off, so the technician ______ (not / have to) turn off the main breaker again.',
        promptVi: 'Chia dạng phủ định của "have to" ở hiện tại đơn để diễn tả việc không cần thiết.',
        acceptedAnswers: ["doesn't have to", 'does not have to'],
        displayAnswer: "doesn't have to",
        explanationVi:
          'Chủ ngữ số ít "the technician" ở thì hiện tại đơn dùng "doesn\'t have to" / "does not have to" (không cần thiết phải làm).'
      },
      {
        id: 'u3-q7',
        unit: 3,
        type: 'rewrite',
        prompt: 'Correct the mistake in this imperative sentence: "Next, using dielectric solvent to clean the bushings."',
        promptVi: 'Sửa lỗi sai ở động từ câu mệnh lệnh ("using") và viết lại câu đúng.',
        acceptedAnswers: [
          'Next, use dielectric solvent to clean the bushings.',
          'Next, use dielectric solvent to clean the bushings'
        ],
        displayAnswer: 'Next, use dielectric solvent to clean the bushings.',
        explanationVi:
          'Câu mệnh lệnh hướng dẫn thao tác phải bắt đầu mệnh đề bằng động từ nguyên thể "use", không dùng V-ing "using".'
      },
      {
        id: 'u3-q8',
        unit: 3,
        type: 'rewrite',
        prompt:
          'Rewrite using "ought to": "It is advisable for installers to use a voltage tester all the time." (Begin with: "Installers ...")',
        promptVi: 'Viết lại câu lời khuyên dùng cấu trúc "ought to".',
        acceptedAnswers: [
          'Installers ought to use a voltage tester all the time.',
          'Installers ought to use a voltage tester all the time'
        ],
        displayAnswer: 'Installers ought to use a voltage tester all the time.',
        explanationVi:
          'Mẫu "It is advisable for somebody to V" chuyển sang động từ khuyết thiếu chỉ lời khuyên là "S + ought to + V(nguyên thể)".'
      }
    ]
  },
  {
    unit: 4,
    title: 'Troubleshooting, Diagnosing & Solutions',
    subtitleVi: 'Câu hỏi kiểm tra sự cố, chẩn đoán nguyên nhân hiện tại/quá khứ và cấu trúc đề xuất giải pháp',
    sections: [
      {
        id: 'u4-sec-troubleshooting',
        title: '1. Troubleshooting Questions (Câu hỏi kiểm tra sự cố)',
        explanationVi:
          'Dùng khi nhân viên hỗ trợ kỹ thuật hỏi người dùng xem họ đã thử các bước xử lý cơ bản hoặc đã hoàn tất kiểm tra bộ phận nào đó hay chưa.',
        formulas: [
          {
            label: 'Hỏi đã thử giải pháp nào chưa',
            pattern: 'Have you tried + V-ing ...?',
            example: 'Have you tried fixing the air filter?',
            translationVi: 'Bạn đã thử sửa bộ lọc không khí chưa?'
          },
          {
            label: 'Hỏi đã thực hiện thao tác kiểm tra chưa',
            pattern: 'Have you + P2 (... yet)?',
            example: 'Have you cleaned the filter yet?',
            translationVi: 'Bạn đã vệ sinh bộ lọc chưa?'
          }
        ],
        notes: [
          '"try + V-ing" mang nghĩa "thử làm một cách nào đó" để kiểm tra kết quả (khác với "try + to V" là cố gắng làm gì).',
          'Trạng từ "yet" đặt cuối câu hỏi thì hiện tại hoàn thành.'
        ]
      },
      {
        id: 'u4-sec-diagnosing',
        title: '2. Diagnosing Problems: Possibility vs. Certainty (Chẩn đoán nguyên nhân)',
        explanationVi:
          'Phân biệt mức độ phỏng đoán có khả năng xảy ra (Possibility) và gần như chắc chắn (Certainty) cho tình huống ở hiện tại hoặc quá khứ.',
        formulas: [
          {
            label: 'Hiện tại — Có khả năng vs Chắc chắn',
            pattern: 'Possibility: S + may / might / could + V  |  Certainty: S + must + V',
            example: 'The file may be too large. / The fan must be dirty.',
            translationVi: 'Tệp tin có thể quá lớn. / Chiếc quạt chắc hẳn là bị bẩn rồi.'
          },
          {
            label: 'Quá khứ — Có khả năng xảy ra',
            pattern: 'Probably / Perhaps + S + V-ed  =  S + may / might / could + have + P2',
            example: 'You might have broken it. (= Probably, you broke it.)',
            translationVi: 'Có lẽ bạn đã làm hỏng nó rồi.'
          },
          {
            label: 'Quá khứ — Chắc chắn đã xảy ra',
            pattern: 'It\'s certain that + S + V-ed  =  S + must + have + P2',
            example: 'You must have broken it. (= It\'s certain that you broke it.)',
            translationVi: 'Chắc chắn là bạn đã làm hỏng nó rồi.'
          }
        ],
        notes: [
          'Sau may / might / could / must ở hiện tại luôn dùng V(nguyên thể) — tuyệt đối tránh lỗi "might was", "might having" hay "may not comes".',
          'Khi chuyển câu quá khứ có "Probably / Perhaps" hoặc "It\'s certain that", phải dùng "modal + have + P2".'
        ]
      },
      {
        id: 'u4-sec-solutions',
        title: '3. Giving Solutions & Maintenance Advice (Đưa ra giải pháp)',
        explanationVi:
          'Dùng để hướng dẫn khách hàng cách xử lý theo từng dấu hiệu cụ thể, chỉ ra linh kiện cần bảo trì hoặc gợi ý thao tác thử khắc phục.',
        formulas: [
          {
            label: 'Câu điều kiện mệnh lệnh',
            pattern: 'If + S + V(Present Simple) ..., V (+ O) ...',
            example: 'If there is no air coming out of the interior unit, check the fan.',
            translationVi: 'Nếu không có luồng khí thổi ra từ dàn lạnh, hãy kiểm tra quạt.'
          },
          {
            label: 'Cấu trúc bị động với need',
            pattern: 'S(vật) + need(s) + V-ing  =  S(vật) + need(s) + to be + P2',
            example: 'The fin needs cleaning. / The fin needs to be cleaned.',
            translationVi: 'Cánh tản nhiệt cần được làm sạch.'
          },
          {
            label: 'Gợi ý thử giải pháp',
            pattern: 'Try + V-ing ...',
            example: 'Try rebooting the computer.',
            translationVi: 'Hãy thử khởi động lại máy tính.'
          }
        ],
        notes: [
          'Khi chủ ngữ là thiết bị/linh kiện (the compressor, the battery, the fin), sau "need(s)" dùng V-ing hoặc "to be + P2" — KHÔNG dùng "needs to replace".',
          'Lời khuyên "had better" luôn đi với V(nguyên thể) không "to" (ví dụ: You had better replace the leaking coils).'
        ]
      }
    ],
    questions: [
      {
        id: 'u4-q1',
        unit: 4,
        type: 'mcq',
        prompt: 'Have you tried ______ the control board or the breaker?',
        promptVi: 'Chọn dạng động từ đúng cho câu hỏi kiểm tra sự cố.',
        options: ['resetting', 'reset', 'to reset', 'resetted'],
        acceptedAnswers: ['resetting'],
        displayAnswer: 'resetting',
        explanationVi:
          'Mẫu câu hỏi troubleshooting là "Have you tried + V-ing...?". Động từ "reset" nhân đôi phụ âm cuối thành "resetting".'
      },
      {
        id: 'u4-q2',
        unit: 4,
        type: 'fill',
        prompt: 'Have you ______ (dismantle) and rinsed the water inlet hose filter yet?',
        promptVi: 'Chia động từ trong ngoặc theo thì hiện tại hoàn thành.',
        acceptedAnswers: ['dismantled'],
        displayAnswer: 'dismantled',
        explanationVi:
          'Cấu trúc "Have you + P2 (... yet)?" yêu cầu quá khứ phân từ của "dismantle" là "dismantled", song song với "rinsed".'
      },
      {
        id: 'u4-q3',
        unit: 4,
        type: 'mcq',
        prompt: 'My AC is blowing but not cooling. The unit might ______ a coolant leak.',
        promptVi: 'Chọn dạng động từ đúng sau động từ khuyết thiếu "might".',
        options: ['have', 'having', 'has', 'had'],
        acceptedAnswers: ['have'],
        displayAnswer: 'have',
        explanationVi:
          'Cấu trúc chẩn đoán hiện tại là "S + may / might / could + V(nguyên thể)", nên sau "might" là động từ nguyên thể "have".'
      },
      {
        id: 'u4-q4',
        unit: 4,
        type: 'mcq',
        prompt: 'The compressor is making a loud noise and needs ______ immediately.',
        promptVi: 'Chọn dạng động từ mang nghĩa bị động đi sau "needs" với chủ ngữ chỉ vật.',
        options: ['replacing', 'to replace', 'replace', 'replaced'],
        acceptedAnswers: ['replacing'],
        displayAnswer: 'replacing',
        explanationVi:
          'Với chủ ngữ là vật ("The compressor"), động từ "needs" đi với V-ing ("needs replacing") hoặc "to be + P2" ("needs to be replaced") mang nghĩa bị động "cần được thay thế".'
      },
      {
        id: 'u4-q5',
        unit: 4,
        type: 'fill',
        prompt: 'If the air filter is clogged with dust, ______ (clean) it before restarting the AC.',
        promptVi: 'Chia động từ trong ngoặc ở vế giải pháp của câu điều kiện mệnh lệnh.',
        acceptedAnswers: ['clean'],
        displayAnswer: 'clean',
        explanationVi:
          'Cấu trúc giải pháp "If + hiện tại đơn, V(nguyên thể) + O" dùng động từ mệnh lệnh nguyên thể "clean".'
      },
      {
        id: 'u4-q6',
        unit: 4,
        type: 'mcq',
        prompt:
          'The indoor unit completely stopped cooling right after the power surge. The surge ______ damaged the PCB.',
        promptVi: 'Chọn cụm động từ khuyết thiếu suy đoán chắc chắn về nguyên nhân đã xảy ra trong quá khứ.',
        options: ['must have', 'must be', 'might be', 'has to'],
        acceptedAnswers: ['must have'],
        displayAnswer: 'must have',
        explanationVi:
          'Mối liên hệ trực tiếp ngay sau sự cố quá khứ ("stopped right after") và phía sau có P2 ("damaged") đòi hỏi cấu trúc suy đoán chắc chắn quá khứ: must have + P2.'
      },
      {
        id: 'u4-q7',
        unit: 4,
        type: 'rewrite',
        prompt: 'Rewrite using "might have": "Probably, the technician forgot to lubricate the motor bearings."',
        promptVi: 'Viết lại câu suy đoán khả năng trong quá khứ bằng cấu trúc "might have + P2".',
        acceptedAnswers: [
          'The technician might have forgotten to lubricate the motor bearings.',
          'The technician might have forgotten to lubricate the motor bearings'
        ],
        displayAnswer: 'The technician might have forgotten to lubricate the motor bearings.',
        explanationVi:
          'Cấu trúc "Probably + S + V-ed" chuyển thành "S + might have + P2". Quá khứ phân từ của "forget/forgot" là "forgotten".'
      },
      {
        id: 'u4-q8',
        unit: 4,
        type: 'rewrite',
        prompt: 'Rewrite using "to be + past participle" without changing meaning: "The radiator fin needs cleaning regularly."',
        promptVi: 'Chuyển đổi từ "needs + V-ing" sang "needs + to be + P2".',
        acceptedAnswers: [
          'The radiator fin needs to be cleaned regularly.',
          'The radiator fin needs to be cleaned regularly',
          'The radiator fin needs to be regularly cleaned.',
          'The radiator fin needs to be regularly cleaned'
        ],
        displayAnswer: 'The radiator fin needs to be cleaned regularly.',
        explanationVi:
          'Cấu trúc "S(vật) + need(s) + V-ing" tương đương hoàn toàn với "S(vật) + need(s) + to be + P2" (needs to be cleaned).'
      }
    ]
  }
];
