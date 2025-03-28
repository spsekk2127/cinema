import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { NextResponse } from "next/server";

// 刪除特定集合中的所有文件
async function deleteCollection(collectionName) {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);

    if (snapshot.empty) {
      return {
        success: true,
        message: `${collectionName} 集合為空`,
        count: 0,
      };
    }

    let deletedCount = 0;
    for (const document of snapshot.docs) {
      await deleteDoc(doc(db, collectionName, document.id));
      deletedCount++;
      console.log(`已刪除 ${collectionName} 文件: ${document.id}`);
    }

    return {
      success: true,
      message: `成功刪除 ${collectionName} 集合資料`,
      count: deletedCount,
    };
  } catch (error) {
    console.error(`刪除 ${collectionName} 時發生錯誤:`, error);
    return {
      success: false,
      message: `刪除 ${collectionName} 失敗`,
      error: error.message,
    };
  }
}

// 獲取所有集合名稱
async function getCollections() {
  try {
    const collections = [];
    const possibleCollections = [
      "movies_Data",
      "theaters_Data",
      "showtimes_Data",
      "users_Data",
      "bookings_Data",
      "tickets_Data",
      "orders_Data"
    ];

    for (const collName of possibleCollections) {
      const collRef = collection(db, collName);
      const snapshot = await getDocs(collRef);
      if (!snapshot.empty) {
        collections.push(collName);
      }
    }

    return collections;
  } catch (error) {
    console.error("獲取集合列表時發生錯誤:", error);
    throw error;
  }
}

// 定義允許的 HTTP 方法
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'GET, DELETE, OPTIONS',
      'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS'
    },
  });
}

// GET 方法：列出所有集合
export async function GET(request) {
  try {
    const collections = await getCollections();
    
    // 建立一個簡單的 HTML 頁面，加入 meta charset 設定
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>刪除 Firestore 集合</title>
          <style>
            body { 
              padding: 20px; 
              font-family: Arial, sans-serif; 
              background-color: rgb(17, 24, 39);  /* Tailwind bg-gray-900 */
              color: white;  /* 文字改為白色 */
            }
            .container { 
              max-width: 800px; 
              margin: 0 auto; 
            }
            .collection-list { 
              margin: 20px 0; 
            }
            .delete-btn {
              background-color: #ff4444;
              color: white;
              padding: 10px 20px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }
            .delete-btn:hover { 
              background-color: #cc0000; 
            }
            pre {
              color: white;  /* JSON 顯示也改為白色 */
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>現有的 Firestore 集合</h1>
            <div class="collection-list">
              <h3>找到以下集合：</h3>
              <ul>
                ${collections.map(name => `<li>${name}</li>`).join('')}
              </ul>
            </div>
            <button class="delete-btn" onclick="deleteCollections()">刪除所有集合</button>
            <p id="result"></p>
          </div>
          <script>
            async function deleteCollections() {
              if (confirm('確定要刪除所有集合嗎？此操作無法復原！')) {
                try {
                  const response = await fetch('/api/init-movies/delete', {
                    method: 'DELETE'
                  });
                  const data = await response.json();
                  document.getElementById('result').innerHTML = 
                    '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                  alert(data.message);
                  location.reload();
                } catch (error) {
                  alert('刪除失敗: ' + error.message);
                }
              }
            }
          </script>
        </body>
      </html>
    `;

    // 回傳時設定正確的 Content-Type 和字符集
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "獲取集合列表失敗",
        details: error.message
      },
      {
        status: 500
      }
    );
  }
}

// DELETE 方法：刪除所有集合資料
export async function DELETE(request) {
  try {
    const collections = await getCollections();
    const results = {};

    for (const collectionName of collections) {
      results[collectionName] = await deleteCollection(collectionName);
    }

    const hasErrors = Object.values(results).some((result) => !result.success);

    if (hasErrors) {
      return NextResponse.json(
        {
          message: "部分集合刪除失敗",
          results,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      message: "所有集合資料已成功刪除",
      results,
    });
  } catch (error) {
    console.error("刪除資料時發生錯誤:", error);
    return NextResponse.json(
      {
        error: "刪除資料失敗",
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
} 